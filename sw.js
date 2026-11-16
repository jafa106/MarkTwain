const SHELL_CACHE = "twain-shell-v2";
const RUNTIME_CACHE = "twain-runtime-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./splash.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== SHELL_CACHE && k !== RUNTIME_CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = e.request.url;
  const isRuntime = /jsdelivr\.net|huggingface\.co|hf\.co|cdn-lfs|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url);
  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    if (cached) return cached;
    try {
      const res = await fetch(e.request);
      if (res && (res.ok || res.type === "opaque")) {
        const cache = await caches.open(isRuntime ? RUNTIME_CACHE : SHELL_CACHE);
        cache.put(e.request, res.clone());
      }
      return res;
    } catch (err) {
      return (await caches.match("./index.html")) || Response.error();
    }
  })());
});
