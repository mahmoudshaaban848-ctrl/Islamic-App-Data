const cacheName = 'azkar-v1';
const assets = [
  'index.html',
  'style.css',
  'script.js',
  'data.js',
  'manifest.json',
  'https://cdn-icons-png.flaticon.com/512/2972/2972331.png'
];

// تثبيت الخدمة وتخزين الملفات
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// تشغيل التطبيق من الذاكرة المخزنة
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
