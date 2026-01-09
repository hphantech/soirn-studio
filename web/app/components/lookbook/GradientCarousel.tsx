"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Look, LookMedia } from "../../(site)/lookbook/lookbookData";

interface GradientCarouselProps {
  looks: Look[];
}

// Physics constants
const FRICTION = 0.9;
const WHEEL_SENS = 0.6;
const DRAG_SENS = 1.0;

// Visual constants
const MAX_ROTATION = 28;
const MAX_DEPTH = 140;
const MIN_SCALE = 0.92;
const SCALE_RANGE = 0.1;
const GAP = 28;

// Color extraction
type RGB = [number, number, number];
type ColorPalette = { c1: RGB; c2: RGB };

/**
 * Infinite 3D Gradient Carousel
 * Based on Codrops 3D Gradient Carousel tutorial
 */
export default function GradientCarousel({ looks }: GradientCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRootRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [isEntering, setIsEntering] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // State refs for animation loop
  const itemsRef = useRef<Array<{ el: HTMLDivElement; x: number }>>([]);
  const positionsRef = useRef<Float32Array>(new Float32Array(0));
  const activeIndexRef = useRef(-1);
  const scrollXRef = useRef(0);
  const vXRef = useRef(0);
  const trackRef = useRef(0);
  const stepRef = useRef(0);
  const cardWRef = useRef(300);
  const vwHalfRef = useRef(0);
  const gradPaletteRef = useRef<ColorPalette[]>([]);
  const gradCurrentRef = useRef({
    r1: 20, g1: 20, b1: 20,
    r2: 15, g2: 15, b2: 15,
  });
  const bgFastUntilRef = useRef(0);

  const rafIdRef = useRef<number | null>(null);
  const bgRAFRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const lastBgDrawRef = useRef(0);

  // Drag state
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const lastDeltaRef = useRef(0);

  // Safe modulo
  const mod = useCallback((n: number, m: number) => {
    return ((n % m) + m) % m;
  }, []);

  // RGB to HSL
  const rgbToHsl = useCallback((r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = 0;
      s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4;
      }
      h /= 6;
    }
    return [h * 360, s, l];
  }, []);

  // HSL to RGB
  const hslToRgb = useCallback((h: number, s: number, l: number): RGB => {
    h = ((h % 360) + 360) % 360;
    h /= 360;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }, []);

  // Extract colors from image
  const extractColors = useCallback((img: HTMLImageElement, idx: number): ColorPalette => {
    try {
      const MAX = 48;
      const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;
      const tw = ratio >= 1 ? MAX : Math.max(16, Math.round(MAX * ratio));
      const th = ratio >= 1 ? Math.max(16, Math.round(MAX / ratio)) : MAX;

      const canvas = document.createElement("canvas");
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext("2d");
      if (!ctx) return { c1: [240, 240, 240], c2: [235, 235, 235] };

      ctx.drawImage(img, 0, 0, tw, th);
      const data = ctx.getImageData(0, 0, tw, th).data;

      const H_BINS = 36;
      const S_BINS = 5;
      const SIZE = H_BINS * S_BINS;
      const wSum = new Float32Array(SIZE);
      const rSum = new Float32Array(SIZE);
      const gSum = new Float32Array(SIZE);
      const bSum = new Float32Array(SIZE);

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3] / 255;
        if (a < 0.05) continue;

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const [h, s, l] = rgbToHsl(r, g, b);

        if (l < 0.1 || l > 0.92 || s < 0.08) continue;

        const w = a * (s * s) * (1 - Math.abs(l - 0.5) * 0.6);
        const hi = Math.max(0, Math.min(H_BINS - 1, Math.floor((h / 360) * H_BINS)));
        const si = Math.max(0, Math.min(S_BINS - 1, Math.floor(s * S_BINS)));
        const bidx = hi * S_BINS + si;

        wSum[bidx] += w;
        rSum[bidx] += r * w;
        gSum[bidx] += g * w;
        bSum[bidx] += b * w;
      }

      let pIdx = -1;
      let pW = 0;
      for (let i = 0; i < SIZE; i++) {
        if (wSum[i] > pW) {
          pW = wSum[i];
          pIdx = i;
        }
      }

      if (pIdx < 0 || pW <= 0) {
        const h = (idx * 37) % 360;
        const s = 0.65;
        return { c1: hslToRgb(h, s, 0.52), c2: hslToRgb(h, s, 0.72) };
      }

      const pHue = Math.floor(pIdx / S_BINS) * (360 / H_BINS);
      let sIdx = -1;
      let sW = 0;
      for (let i = 0; i < SIZE; i++) {
        const w = wSum[i];
        if (w <= 0) continue;
        const h = Math.floor(i / S_BINS) * (360 / H_BINS);
        let dh = Math.abs(h - pHue);
        dh = Math.min(dh, 360 - dh);
        if (dh >= 25 && w > sW) {
          sW = w;
          sIdx = i;
        }
      }

      const avgRGB = (idx: number): RGB => {
        const w = wSum[idx] || 1e-6;
        return [
          Math.round(rSum[idx] / w),
          Math.round(gSum[idx] / w),
          Math.round(bSum[idx] / w),
        ];
      };

      const [pr, pg, pb] = avgRGB(pIdx);
      let [h1, s1] = rgbToHsl(pr, pg, pb);
      s1 = Math.max(0.45, Math.min(1, s1 * 1.15));
      const c1 = hslToRgb(h1, s1, 0.5);

      let c2: RGB;
      if (sIdx >= 0 && sW >= pW * 0.6) {
        const [sr, sg, sb] = avgRGB(sIdx);
        let [h2, s2] = rgbToHsl(sr, sg, sb);
        s2 = Math.max(0.45, Math.min(1, s2 * 1.05));
        c2 = hslToRgb(h2, s2, 0.72);
      } else {
        c2 = hslToRgb(h1, s1, 0.72);
      }

      return { c1, c2 };
    } catch {
      const h = (idx * 37) % 360;
      const s = 0.65;
      return { c1: hslToRgb(h, s, 0.52), c2: hslToRgb(h, s, 0.72) };
    }
  }, [rgbToHsl, hslToRgb]);

  // Compute transform components
  const computeTransformComponents = useCallback((screenX: number) => {
    const norm = Math.max(-1, Math.min(1, screenX / vwHalfRef.current));
    const absNorm = Math.abs(norm);
    const invNorm = 1 - absNorm;
    const ry = -norm * MAX_ROTATION;
    const tz = invNorm * MAX_DEPTH;
    const scale = MIN_SCALE + invNorm * SCALE_RANGE;
    return { norm, absNorm, invNorm, ry, tz, scale };
  }, []);

  // Transform for screen position
  const transformForScreenX = useCallback((screenX: number) => {
    const { ry, tz, scale } = computeTransformComponents(screenX);
    return {
      transform: `translate3d(${screenX}px,-50%,${tz}px) rotateY(${ry}deg) scale(${scale})`,
      z: tz,
    };
  }, [computeTransformComponents]);

  // Update carousel transforms
  const updateCarouselTransforms = useCallback(() => {
    const half = trackRef.current / 2;
    let closestIdx = -1;
    let closestDist = Infinity;

    for (let i = 0; i < itemsRef.current.length; i++) {
      let pos = itemsRef.current[i].x - scrollXRef.current;
      if (pos < -half) pos += trackRef.current;
      if (pos > half) pos -= trackRef.current;
      positionsRef.current[i] = pos;

      const dist = Math.abs(pos);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    }

    const prevIdx = (closestIdx - 1 + itemsRef.current.length) % itemsRef.current.length;
    const nextIdx = (closestIdx + 1) % itemsRef.current.length;

    for (let i = 0; i < itemsRef.current.length; i++) {
      const it = itemsRef.current[i];
      const pos = positionsRef.current[i];
      const { transform, z } = transformForScreenX(pos);

      it.el.style.transform = transform;
      it.el.style.zIndex = String(1000 + Math.round(z));

      const isCore = i === closestIdx || i === prevIdx || i === nextIdx;
      const norm = Math.max(-1, Math.min(1, pos / vwHalfRef.current));
      const blur = isCore ? 0 : 2 * Math.pow(Math.abs(norm), 1.1);
      it.el.style.filter = `blur(${blur.toFixed(2)}px)`;
    }

    if (closestIdx !== activeIndexRef.current) {
      setActiveGradient(closestIdx);
    }
  }, [transformForScreenX]);

  // Set active gradient - DISABLED: Use fixed dark gradient instead
  const setActiveGradient = useCallback((idx: number) => {
    if (idx < 0 || idx >= itemsRef.current.length || idx === activeIndexRef.current) return;

    activeIndexRef.current = idx;
    // Fixed dark Soirn Studio gradient - no color extraction
    const to = {
      r1: 20,
      g1: 20,
      b1: 20,
      r2: 15,
      g2: 15,
      b2: 15,
    };

    bgFastUntilRef.current = performance.now() + 800;
    gsap.to(gradCurrentRef.current, { ...to, duration: 0.45, ease: "power2.out" });
  }, []);

  // Animation loop
  const tick = useCallback((t: number) => {
    const dt = lastTimeRef.current ? (t - lastTimeRef.current) / 1000 : 0;
    lastTimeRef.current = t;

    scrollXRef.current = mod(scrollXRef.current + vXRef.current * dt, trackRef.current);
    const decay = Math.pow(FRICTION, dt * 60);
    vXRef.current *= decay;
    if (Math.abs(vXRef.current) < 0.02) vXRef.current = 0;

    updateCarouselTransforms();
    rafIdRef.current = requestAnimationFrame(tick);
  }, [mod, updateCarouselTransforms]);

  const startCarousel = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    lastTimeRef.current = 0;
    rafIdRef.current = requestAnimationFrame((t) => {
      updateCarouselTransforms();
      tick(t);
    });
  }, [updateCarouselTransforms, tick]);

  // Background rendering
  const drawBackground = useCallback(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;

    const now = performance.now();
    const minInterval = now < bgFastUntilRef.current ? 16 : 33;

    if (now - lastBgDrawRef.current < minInterval) {
      bgRAFRef.current = requestAnimationFrame(drawBackground);
      return;
    }

    lastBgDrawRef.current = now;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    const tw = Math.floor(w * dpr);
    const th = Math.floor(h * dpr);

    if (canvas.width !== tw || canvas.height !== th) {
      canvas.width = tw;
      canvas.height = th;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Dark Soirn Studio background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    const time = now * 0.0002;
    const cx = w * 0.5;
    const cy = h * 0.5;
    const a1 = Math.min(w, h) * 0.35;
    const a2 = Math.min(w, h) * 0.28;

    const x1 = cx + Math.cos(time) * a1;
    const y1 = cy + Math.sin(time * 0.8) * a1 * 0.4;
    const x2 = cx + Math.cos(-time * 0.9 + 1.2) * a2;
    const y2 = cy + Math.sin(-time * 0.7 + 0.7) * a2 * 0.5;

    const r1 = Math.max(w, h) * 0.75;
    const r2 = Math.max(w, h) * 0.65;

    const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r1);
    const gc = gradCurrentRef.current;
    // Colors are already brightened in setActiveGradient, use them directly
    // Lower opacity for subtle effect on dark background
    g1.addColorStop(0, `rgba(${gc.r1},${gc.g1},${gc.b1},0.4)`);
    g1.addColorStop(1, "rgba(10,10,10,0)");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
    g2.addColorStop(0, `rgba(${gc.r2},${gc.g2},${gc.b2},0.3)`);
    g2.addColorStop(1, "rgba(10,10,10,0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);

    bgRAFRef.current = requestAnimationFrame(drawBackground);
  }, []);

  const startBG = useCallback(() => {
    if (bgRAFRef.current) cancelAnimationFrame(bgRAFRef.current);
    bgRAFRef.current = requestAnimationFrame(drawBackground);
  }, [drawBackground]);

  // Measure cards
  const measure = useCallback(() => {
    const sample = itemsRef.current[0]?.el;
    if (!sample) return;

    const r = sample.getBoundingClientRect();
    cardWRef.current = r.width || 300;
    stepRef.current = cardWRef.current + GAP;
    trackRef.current = itemsRef.current.length * stepRef.current;

    itemsRef.current.forEach((it, i) => {
      it.x = i * stepRef.current;
    });

    positionsRef.current = new Float32Array(itemsRef.current.length);
  }, []);

  // Build palette
  const buildPalette = useCallback(() => {
    gradPaletteRef.current = itemsRef.current.map((it, i) => {
      const img = it.el.querySelector("img") as HTMLImageElement;
      return img ? extractColors(img, i) : { c1: [20, 20, 20], c2: [15, 15, 15] };
    });
  }, [extractColors]);

  // Entry animation
  const animateEntry = useCallback(async () => {
    await new Promise((r) => requestAnimationFrame(r));

    const visibleCards: Array<{ item: typeof itemsRef.current[0]; screenX: number; index: number }> = [];
    const viewportWidth = window.innerWidth;
    const half = trackRef.current / 2;

    for (let i = 0; i < itemsRef.current.length; i++) {
      let pos = itemsRef.current[i].x - scrollXRef.current;
      if (pos < -half) pos += trackRef.current;
      if (pos > half) pos -= trackRef.current;

      const screenX = pos;
      if (Math.abs(screenX) < viewportWidth * 0.6) {
        visibleCards.push({ item: itemsRef.current[i], screenX, index: i });
      }
    }

    visibleCards.sort((a, b) => a.screenX - b.screenX);

    const tl = gsap.timeline();

    visibleCards.forEach(({ item, screenX }, idx) => {
      const state = { p: 0 };
      const { ry, tz, scale: baseScale } = computeTransformComponents(screenX);
      const START_SCALE = 0.92;
      const START_Y = 40;

      item.el.style.opacity = "0";
      item.el.style.transform =
        `translate3d(${screenX}px,-50%,${tz}px) ` +
        `rotateY(${ry}deg) ` +
        `scale(${START_SCALE}) ` +
        `translateY(${START_Y}px)`;

      tl.to(
        state,
        {
          p: 1,
          duration: 0.6,
          ease: "power3.out",
          onUpdate: () => {
            const t = state.p;
            const currentScale = START_SCALE + (baseScale - START_SCALE) * t;
            const currentY = START_Y * (1 - t);
            item.el.style.opacity = t.toFixed(3);

            if (t >= 0.999) {
              const { transform } = transformForScreenX(screenX);
              item.el.style.transform = transform;
            } else {
              item.el.style.transform =
                `translate3d(${screenX}px,-50%,${tz}px) ` +
                `rotateY(${ry}deg) ` +
                `scale(${currentScale}) ` +
                `translateY(${currentY}px)`;
            }
          },
        },
        idx * 0.05
      );
    });

    await new Promise((resolve) => {
      tl.eventCallback("onComplete", resolve);
    });
  }, [computeTransformComponents, transformForScreenX]);

  // Initialize - with proper cleanup
  useEffect(() => {
    if (!stageRef.current || !cardsRootRef.current || looks.length === 0) return;

    // Cleanup previous state
    itemsRef.current = [];
    if (cardsRootRef.current) {
      cardsRootRef.current.innerHTML = "";
    }
    setImagesLoaded(false);
    setIsEntering(true);
    scrollXRef.current = 0;
    vXRef.current = 0;
    activeIndexRef.current = -1;

    // Create cards
    const fragment = document.createDocumentFragment();

    looks.forEach((look, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.willChange = "transform";

      const firstMedia = look.media[0];
      if (firstMedia.type === "image") {
        const img = document.createElement("img");
        img.className = "card__img";
        img.decoding = "async";
        img.loading = i < 3 ? "eager" : "lazy";
        img.draggable = false;
        img.src = firstMedia.src;
        card.appendChild(img);
      }

      fragment.appendChild(card);
      itemsRef.current.push({ el: card, x: i * stepRef.current });
    });

    cardsRootRef.current.appendChild(fragment);

    // Wait for images
    const waitForImages = async () => {
      const promises = itemsRef.current.map((it) => {
        const img = it.el.querySelector("img");
        if (!img || img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };

    waitForImages();

    return () => {
      // Cleanup on unmount
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (bgRAFRef.current) cancelAnimationFrame(bgRAFRef.current);
      itemsRef.current = [];
    };
  }, [looks]);

  // Setup after images load
  useEffect(() => {
    if (!imagesLoaded || itemsRef.current.length === 0) return;

    vwHalfRef.current = window.innerWidth * 0.5;
    measure();
    updateCarouselTransforms();
    stageRef.current?.classList.add("carousel-mode");

    const init = async () => {
      // Skip palette building - we use fixed gradient
      // buildPalette();

      // Set initial gradient to fixed dark
      const half = trackRef.current / 2;
      let closestIdx = 0;
      let closestDist = Infinity;

      for (let i = 0; i < itemsRef.current.length; i++) {
        let pos = itemsRef.current[i].x - scrollXRef.current;
        if (pos < -half) pos += trackRef.current;
        if (pos > half) pos -= trackRef.current;
        const d = Math.abs(pos);
        if (d < closestDist) {
          closestDist = d;
          closestIdx = i;
        }
      }

      setActiveGradient(closestIdx);

      // Start background
      startBG();
      await new Promise((r) => setTimeout(r, 100));

      // Entry animation
      if (loaderRef.current) loaderRef.current.classList.add("loader--hide");
      await animateEntry();

      setIsEntering(false);
      startCarousel();
    };

    init();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (bgRAFRef.current) cancelAnimationFrame(bgRAFRef.current);
    };
  }, [imagesLoaded, measure, updateCarouselTransforms, setActiveGradient, startBG, animateEntry, startCarousel]);

  // Event handlers
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || isEntering) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      vXRef.current += delta * WHEEL_SENS * 20;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(".frame")) return;
      draggingRef.current = true;
      lastXRef.current = e.clientX;
      lastTRef.current = performance.now();
      lastDeltaRef.current = 0;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("dragging");
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const now = performance.now();
      const dx = e.clientX - lastXRef.current;
      const dt = Math.max(1, now - lastTRef.current) / 1000;
      scrollXRef.current = mod(scrollXRef.current - dx * DRAG_SENS, trackRef.current);
      lastDeltaRef.current = dx / dt;
      lastXRef.current = e.clientX;
      lastTRef.current = now;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      stage.releasePointerCapture(e.pointerId);
      vXRef.current = -lastDeltaRef.current * DRAG_SENS;
      stage.classList.remove("dragging");
    };

    const handleResize = () => {
      const prevStep = stepRef.current || 1;
      const ratio = scrollXRef.current / (itemsRef.current.length * prevStep);
      vwHalfRef.current = window.innerWidth * 0.5;
      measure();
      scrollXRef.current = mod(ratio * trackRef.current, trackRef.current);
      updateCarouselTransforms();
    };

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 80);
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    stage.addEventListener("dragstart", (e) => e.preventDefault());
    stage.addEventListener("pointerdown", handlePointerDown);
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("resize", debouncedResize);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        if (bgRAFRef.current) cancelAnimationFrame(bgRAFRef.current);
      } else {
        startCarousel();
        startBG();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stage.removeEventListener("wheel", handleWheel);
      stage.removeEventListener("pointerdown", handlePointerDown);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isEntering, mod, measure, updateCarouselTransforms, startCarousel, startBG]);

  if (looks.length === 0) return null;

  return (
    <main ref={stageRef} className="stage" aria-live="polite">
      <div ref={loaderRef} className="loader" aria-label="Loading" aria-live="assertive">
        <div className="loader__content">
          <div className="loader__ring" aria-hidden="true"></div>
        </div>
      </div>
      <canvas ref={bgCanvasRef} id="bg" aria-hidden="true"></canvas>
      <section ref={cardsRootRef} id="cards" className="cards" aria-label="Infinite carousel of looks"></section>
    </main>
  );
}
