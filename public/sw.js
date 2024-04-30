// eslint-disable-next-line no-undef
importScripts('./sw-utils.js');

const DEBUG_MODE = true;



const swConstants =
    // eslint-disable-next-line no-undef
    new ServiceWorkerConstants ({version: 'version_03'  })

// eslint-disable-next-line no-undef
class Debug extends ServiceWorkerDebug {}

Debug.isDebugMode = !DEBUG_MODE;





const clearCaches = async () => {
    return caches.keys().then(function(keys) {
        return Promise.all(keys.filter(function(key) {
            return key.indexOf(swConstants.CACHE_NAME) !== 0;
        }).map(function(key) {
            Debug.log('Removing old cache: ' + key);
            return caches.delete(key);
        }));
    });
};

self.addEventListener('activate',   (activationEvent)=> {
    Debug.log(`[Service Worker] Activating Service Worker version ${swConstants.version} ....`);
    activationEvent.waitUntil(caches.keys()
        .then(function(keyList) {
            Debug.log('[Service Worker] existing keyList', keyList);
            return Promise.all(keyList.map(function(key) {
                if (key !== swConstants.CACHE_NAME && key !==
                    swConstants.CACHE_CORE_NAME) {
                    Debug.log('[Service Worker] Removing old cache :', key);
                    return caches.delete(key);
                }
            }));
        }));
    clearCaches().then(() => {
        return self.clients.claim();
    });
});

self.addEventListener('install',   () => {
    self.skipWaiting().then(() => Debug.log(` [Service Worker] Installing Service Worker ${swConstants.swName}`   ));
});

self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(caches.match(fetchEvent.request).then((fetchResponse) => {
        if (fetchResponse) {
            Debug.debounceLog('[Service Worker] From cache: ' + fetchEvent.request.url);
            return fetchResponse;
        }
        return fetch(fetchEvent.request).then((response) => {
            return caches.open(swConstants.CACHE_NAME).then((cache) => {
                if (!fetchEvent.request.url.includes('@')) {
                    // don't cache in development
                    Debug.log('[Service Worker] Caching resource: ' + fetchEvent.request.url);
                    cache.put(fetchEvent.request, response.clone());
                }

                return response;
            });
        });
    }));
});
