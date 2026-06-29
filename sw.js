const CACHE_NAME = 'scahs-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json', // 👈 매니페스트 파일도 캐시 목록에 추가하는 것을 권장합니다.
  '/icon.png'        // 👈 앱 아이콘도 등록해 두면 안전합니다.
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
