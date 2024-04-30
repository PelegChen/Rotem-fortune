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
const URLS = [`${GHPATH}/`, `${GHPATH}/index.html`,
];
const CACHE_NAME = APP_PREFIX + VERSION;
const CACHE_CORE_NAME = APP_PREFIX + 'core'  ; // core files of the app no to change

class Debug {
    static ConsoleOff = false
    static isLoggingToConsole() {
        return  self.location.hostname === 'localhost'  && !Debug.ConsoleOff;
    }
    static log(...args) {
        if (!Debug.isLoggingToConsole()){
            return;
        }
        console.log(...args);
    }
}

const clearCaches = async () => {
    return caches.keys().then(function(keys) {
        return Promise.all(keys.filter(function(key) {
                return key.indexOf(CACHE_NAME) !== 0;
            }).map(function(key) {
                console.log('Removing old cache: '+key);
                return caches.delete(key);
            })
        );
    })
}

self.addEventListener('activate', function(activationEvent) {
    Debug.log('[Service Worker] Activating Service Worker ....' );

    activationEvent.waitUntil(caches.keys()
        .then(function(keyList) {
            Debug.log('keyList', keyList)
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_NAME && key !== CACHE_CORE_NAME) {
                    Debug.log('[Service Worker] Removing old cache.', key);
                    return caches.delete(key);
                }
            }));
        }));
    clearCaches().then( () => {
        return self.clients.claim();
    })
});

self.addEventListener('install',  () => {
    self.skipWaiting().then(r=>Debug.log("installing",r));
});

self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((fetchResponse) => {
            if (fetchResponse){
             //   console.log('From cache: '+e.request.url)
            return fetchResponse
            }
            return fetch(fetchEvent.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    if (!fetchEvent.request.url.includes("@")) {
                        // don't cache in development
                        Debug.log('Caching resource: ' + fetchEvent.request.url);
                        cache.put(fetchEvent.request, response.clone());
                    }

                    return response;
                });
            });
        })
    );
});
