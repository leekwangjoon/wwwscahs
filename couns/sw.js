// sw.js 파일 내용
const CACHE_NAME = 'scahs-v5'; // 👈 버전을 v1에서 v2로 변경하여 강제 업데이트 유도
const ASSETS = [
  './',                  /* 상대경로 점(.) 추가 */
  './index.html',        /* 상대경로 점(.) 추가 */
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // 👈 새 서비스 워커가 바로 활성화되도록 유도
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 👈 예전 캐시 삭제
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
