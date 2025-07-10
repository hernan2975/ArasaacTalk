const CACHE_NAME = "arasaac-cache-v1";
const PRECACHE = [
  "/", // index.html
  "/static/css/style.css",
  "/static/js/main.js",
  "/static/js/preload.js",
  "/static/js/speech.js",
  "/static/js/ui.js",
  "/static/js/indexeddb.js",
  "/templates/index.html",
  "/preload/categorias.json",
  "/preload/pictogramas.json"
];

// 📦 Precarga inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
});

// 🔄 Activación y limpieza de versiones viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// 🌐 Interceptar requests
self.addEventListener("fetch", event => {
  const { request } = event;

  // Solo GET y mismo origen
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(request).then(cached =>
      cached || fetch(request).catch(() => {
        // Fallback si no hay red
        if (request.url.endsWith(".json")) {
          return new Response(JSON.stringify({ error: "Sin conexión" }), {
            headers: { "Content-Type": "application/json" }
          });
        }
        return new Response("Sin conexión", { status: 503 });
      })
    )
  );
});
