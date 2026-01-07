import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source : "site";

  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const { error } = await supabase
    .from("waitlist_signups")
    .insert([{ email, source }]);

  if (error?.code === "23505") {
    return NextResponse.json({ ok: true, already: true });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
