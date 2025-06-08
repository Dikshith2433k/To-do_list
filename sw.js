const CACHE_NAME='todo-cache-v1';
const ASSETS_TO_CACHE=[
    '/' ,
    '/index.html' ,
    '/style.css' ,
    '/app.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

//Install event - caching app shell
self.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS_TO_CACHE)).then(()=>self.skipWaiting)
    );
});

//Activate Event - cleanup old caches
self.addEventListener('activate',event=>{
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))
            )
        ).then(()=>self.clients.claim())
    );
});

//Fetch event -serve cached content when offline
self.addEventListener('fetch',event=>{
    event.respondWith(
        caches.match(event.request).then(res=>res || fetch(event.request))
    );
});
