
// eslint-disable-next-line no-undef
importScripts('./sw-utils.js');

const DEBUG_MODE = true;
const VERSION = 'version_00';

// eslint-disable-next-line no-undef
class SwConstants extends ServiceWorkerConstants {}
// eslint-disable-next-line no-undef
class Debug extends SwDebug {}

Debug.isDebugMode = !DEBUG_MODE;
SwConstants.VERSION = VERSION;



const clearCaches = async () => {
    return caches.keys().then(function(keys) {
        return Promise.all(keys.filter(function(key) {
            return key.indexOf(SwConstants.CACHE_NAME) !== 0;
        }).map(function(key) {
            console.log('Removing old cache: ' + key);
            return caches.delete(key);
        }));
    });
};

self.addEventListener('activate', function(activationEvent) {
    Debug.log('[Service Worker] Activating Service Worker ....');

    activationEvent.waitUntil(caches.keys()
        .then(function(keyList) {
            Debug.log('keyList', keyList);
            return Promise.all(keyList.map(function(key) {
                if (key !== SwConstants.CACHE_NAME && key !== SwConstants.CACHE_CORE_NAME) {
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
    self.skipWaiting().then(r => Debug.log('installing', r));
});

self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(caches.match(fetchEvent.request).then((fetchResponse) => {
        if (fetchResponse) {
            if (fetchEvent.request.url.includes('sw')) {

                Debug.log('From cache: ' + fetchEvent.request.url);
            }
            return fetchResponse;
        }
        return fetch(fetchEvent.request).then((response) => {
            return caches.open(SwConstants.CACHE_NAME).then((cache) => {
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
