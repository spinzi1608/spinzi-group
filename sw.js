/* SPINZI GROUP — Service Worker (PWA) v7.21
   Estrategia: CACHE-FIRST para la app (abre al instante, aunque estés fuera de la red local)
   y actualiza en segundo plano cuando hay internet. Los datos NUNCA se cachean (van por nube/local). */
const CACHE = 'spinzi-v7-21';
const STATIC = [
  './logo.png',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './qrcode.min.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(STATIC); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = e.request.url || '';
  /* Los datos NUNCA se cachean */
  if (url.indexOf('/api/') >= 0) { e.respondWith(fetch(e.request)); return; }
  /* La app (index.html): cache-first (abre al instante aunque no haya red/servidor)
     y en segundo plano trae la versión nueva cuando hay internet. */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then(function (hit) {
        var net = fetch(e.request).then(function (res) {
          if (res && res.status === 200) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
          }
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      })
    );
    return;
  }
  /* Estáticos: cache-first con actualización en segundo plano */
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () { return caches.match('./index.html'); });
    })
  );
});
