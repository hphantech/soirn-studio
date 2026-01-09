import { useEffect } from "react";

/**
 * Hook to lock body scroll when modal/viewer is open
 * Prevents background scrolling while maintaining scroll position
 */
export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [lock]);
}
