/* Service Worker — Cuotas Pendientes SPINZI GROUP (offline) */
var CACHE = 'cuotas-spinzi-v1';
var ARCHIVOS = [
  './index.html',
  './manifest.webmanifest',
  './favicon-identidad.png',
  './icon-identidad-192.png',
  './icon-identidad-512.png'
];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ARCHIVOS)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
  }).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(function(resp){
      return resp || fetch(e.request).then(function(r){
        var copia = r.clone();
        caches.open(CACHE).then(function(c){c.put(e.request, copia)});
        return r;
      }).catch(function(){ return caches.match('./index.html') });
    })
  );
});
