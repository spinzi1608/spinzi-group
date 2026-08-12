/* SPINZI GROUP — Service Worker (PWA) v7.27
   Estrategia: CACHE-FIRST para la app (abre al instante, aunque estés fuera de la red local)
   y actualiza en segundo plano cuando hay internet. Los datos NUNCA se cachean (van por nube/local).
   v7.22: íconos con nombre nuevo (-v722) para que el navegador NO pueda servir el logo viejo cacheado.
   v7.27: el nombre de caché cambió para que todos los equipos tomen la versión nueva. */
const CACHE = 'spinzi-v7-27';
const STATIC = [
  './logo.png',
  './logo-s.jpeg',
  './manifest.webmanifest',
  './icon-192-v724.png',
  './icon-512-v724.png',
  './apple-touch-icon-v724.png',
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
