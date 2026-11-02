// Solo Lifting: Oura relay. Oura's API won't answer browser apps directly (no CORS), so the app asks this function,
// which forwards the request to Oura with the user's own token and passes the answer straight back.
// Nothing is stored or logged. Only GET requests for the listed Oura data types, only from the Solo Lifting site.
// Deploy: Supabase dashboard > Edge Functions > Deploy a new function > Via editor, name it "oura", paste this, deploy,
// then in the function's settings turn OFF "Verify JWT" (the Oura token travels in the x-oura-token header instead).
const ALLOW = "https://jaidynkay314-cyber.github.io";
const PATHS = new Set([
  "daily_readiness", "daily_sleep", "daily_activity", "daily_stress", "daily_spo2", "daily_resilience",
  "daily_cardiovascular_age", "vo2_max", "heartrate", "sleep", "session", "workout",
]);
const cors = {
  "Access-Control-Allow-Origin": ALLOW,
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "x-oura-token, apikey, authorization, x-client-info, content-type",
  "Vary": "Origin",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "GET") return json({ error: "GET only" }, 405);
  const origin = req.headers.get("origin");
  if (origin && origin !== ALLOW) return json({ error: "not allowed" }, 403);
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "";
  if (!PATHS.has(path)) return json({ error: "unknown data type" }, 400);
  const token = req.headers.get("x-oura-token");
  if (!token) return json({ error: "no Oura token" }, 401);
  url.searchParams.delete("path");
  const r = await fetch(`https://api.ouraring.com/v2/usercollection/${path}?${url.searchParams}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return new Response(await r.text(), { status: r.status, headers: { ...cors, "Content-Type": "application/json" } });
});
