// Change this to your repository name
const GHPATH = '/Rotem-fortune';

// Choose a different app prefix name
const APP_PREFIX = 'rtmfort_';

// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…).
// If you don't change the version, the service worker will give your
// users the old files!
const VERSION = 'version_00';

// The files to make available for offline use. make sure to add
// others to this list
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const URLS = [`${GHPATH}/`, `${GHPATH}/index.html`, // `${GHPATH}/css/styles.css`,
    // `${GHPATH}/js/app.js`
];
const CACHE_STATIC_NAME = APP_PREFIX + VERSION;
const CACHE_DYNAMIC_NAME = APP_PREFIX + 'dynamic';
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(caches.keys()
        .then(function(keyList) {
            console.log('keyList', keyList)
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                    console.log('[Service Worker] Removing old cache.', key);
                    return caches.delete(key);
                }
            }));
        }));
    return self.clients.claim();
});

self.addEventListener('install',  () => {
    self.skipWaiting().then( );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            if (r){
                console.log('[Service Worker] Loading resource from cache: '+e.request.url)
            return r
            }
            return fetch(e.request).then((response) => {
                return caches.open(CACHE_STATIC_NAME).then((cache) => {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
