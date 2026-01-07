import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/* ─────────────────────────────
   Supabase (server-only client)
───────────────────────────── */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ─────────────────────────────
   Validation
───────────────────────────── */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/* ─────────────────────────────
   Rate limiting (in-memory)
   NOTE: fine for now, later swap to Redis/Upstash
───────────────────────────── */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per IP per window
const hits = new Map<string, { count: number; resetAt: number }>();

function getIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  hits.set(ip, entry);
  return { ok: true };
}

/* ─────────────────────────────
   POST /api/waitlist
───────────────────────────── */
export async function POST(req: Request) {
  // rate limit FIRST
  const ip = getIp(req);
  const rl = rateLimit(ip);

  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again soon." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.retryAfterMs ?? 0) / 1000)),
        },
      }
    );
  }

  // parse + sanitize
  const body = await req.json().catch(() => ({}));
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source : "site";

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // insert
  const { error } = await supabase
    .from("waitlist_signups")
    .insert([{ email, source }]);

  // duplicate (unique constraint)
  if (error?.code === "23505") {
    return NextResponse.json({ ok: true, already: true });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
