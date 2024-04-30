// eslint-disable-next-line no-undef
importScripts('./sw-utils.js');

const DEBUG_MODE = true;



const swConstants =
    // eslint-disable-next-line no-undef
    new ServiceWorkerConstants ({version: 'version_01'  })

// eslint-disable-next-line no-undef
class Debug extends ServiceWorkerDebug {}

Debug.isDebugMode = !DEBUG_MODE;



console.log(' swConstants.CACHE_NAME' )
console.log( swConstants.CACHE_NAME )

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

self.addEventListener('activate', function(activationEvent) {
    Debug.log(`[Service Worker] Activating Service Worker ${swConstants.swName} ....`);

    activationEvent.waitUntil(caches.keys()
        .then(function(keyList) {
            Debug.log('keyList', keyList);
            return Promise.all(keyList.map(function(key) {
                if (key !== swConstants.CACHE_NAME && key !==
                    swConstants.CACHE_CORE_NAME) {
                    Debug.log('[Service Worker] Removing old cache.', key);
                    return caches.delete(key);
                }
            }));
        }));
    clearCaches().then(() => {
        return self.clients.claim();
    });
});

self.addEventListener('install', () => {
    self.skipWaiting().then(() => Debug.log('installing' ));
});

self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(caches.match(fetchEvent.request).then((fetchResponse) => {
        if (fetchResponse) {
            Debug.debounceLog('From cache: ' + fetchEvent.request.url);
            return fetchResponse;
        }
        return fetch(fetchEvent.request).then((response) => {
            return caches.open(swConstants.CACHE_NAME).then((cache) => {
                if (!fetchEvent.request.url.includes('@')) {
                    // don't cache in development
                    Debug.log('Caching resource: ' + fetchEvent.request.url);
                    cache.put(fetchEvent.request, response.clone());
                }

                return response;
            });
        });
    }));
});
