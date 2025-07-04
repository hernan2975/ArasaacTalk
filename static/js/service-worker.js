const CACHE_NAME = 'arasaac-offline-v1';
const URLS = [
  '/',
  '/manifest.webmanifest',
  '/static/js/main.js',
  '/static/js/indexeddb.js',
  '/static/css/style.css',
  '/templates/index.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
