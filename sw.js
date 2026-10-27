// Solo Lifting offline worker. Bump VERSION whenever any file changes so phones pick up the update.
const VERSION = "solo-lifting-v8.6.1";
const SHELL = ["./", "./index.html", "./config.js", "./cards/cards.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-512-maskable.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))));
  // no skipWaiting here: the app shows "Update available" and the user taps to switch
});
self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  // only the app's own files and fonts are cached; the shared board's database calls always go to the network
  if (url.origin !== self.location.origin && !fonts) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(e.request, res.clone());
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
