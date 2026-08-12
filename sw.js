/* SPINZI GROUP — Service Worker (PWA) v1.1
   Estrategia: NETWORK-FIRST para la app (siempre trae la versión más nueva cuando hay internet;
   si estás sin conexión, abre desde la caché). Los datos NUNCA se cachean (van por nube/local). */
const CACHE = 'spinzigroup-v1-1';
const STATIC = [
  './logo.png',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  /* v1.1 — borrar TODAS las caches viejas (incluidas las de la app original SPINZI v7.x)
     para que el service worker nuevo no sirva la app vieja y cancele navegaciones */
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () {
      return caches.open(CACHE).then(function (c) { return c.addAll(STATIC); });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* La app pide saltar la espera cuando hay una versión nueva esperando */
self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = e.request.url || '';
  /* Los datos NUNCA se cachean */
  if (url.indexOf('/api/') >= 0) { e.respondWith(fetch(e.request)); return; }
  /* La app (index.html): NETWORK-FIRST — con internet trae la versión más nueva SIEMPRE;
     sin internet abre desde la caché (funciona offline). */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        }
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (hit) { return hit || caches.match(e.request); });
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
