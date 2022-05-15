const appContents = [
  '/index.html',
  'js/app.js',
  'css/main.css',
  "/img/logo.png",
  "/"
];


const cacheName = 'v1.taPWA';

self.addEventListener('install', (e) => {
  console.log('Service Worker Install');

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log('Service Worker Caching all: App content');
      await cache.addAll(appContents);
    })()
  );
});

// self.addEventListener('fetch', function (e) {
//   console.log('Start Service Worker');
//   e.respondWith(
//     (async () => {
//       const res = await caches.match(e.request);
//       console.log(`Service Worker Fetching: ${e.request.url}`);
//       if (res) {
//         return res;
//       }
//       const response = await fetch(e.request);
//       const cache = await caches.open(cacheName);
//       console.log(`Service Worker Caching new files: ${e.request.url}`);
//       cache.put(e.request, response.clone());
//       return response;
//     })()
//   );
// });

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

