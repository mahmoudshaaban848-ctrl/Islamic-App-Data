/* ================================
   المرجعية الإسلامية
   Service Worker v4.0
================================ */

const CACHE_NAME = "islamic-reference-v4";

const ASSETS_TO_CACHE = [
    "/",
    "index.html",
    "style.css",
    "script.js",
    "data.js",
    "manifest.json"
];

/* ================================
   تثبيت الكاش
================================ */
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

/* ================================
   تفعيل الكاش
================================ */
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

/* ================================
   جلب الملفات (أوفلاين أولاً)
================================ */
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});