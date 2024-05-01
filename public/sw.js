// eslint-disable-next-line no-undef
importScripts('./sw-utils.js');

const DEBUG_MODE = true;

const swConstants = // eslint-disable-next-line no-undef
    new ServiceWorkerConstants({ version: 'version_05' });

// eslint-disable-next-line no-undef
class Debug extends ServiceWorkerDebug {}

Debug.isDebugMode = !DEBUG_MODE;


const clearCaches = async () => {
    Debug.log('Checking and Clearing old caches...');
    const keys = await caches.keys();
    const allKeysToDelete = keys.filter(function(key) {
        return key.indexOf(swConstants.CACHE_NAME) !== 0 && key !==
            swConstants.CACHE_CORE_NAME;
    });
    let letCachesFound = 0;
    await Promise.all(allKeysToDelete.map((key) => {
        Debug.log('Removing old cache: ' + key);
        letCachesFound++;
        return caches.delete(key);
    }));
    if (letCachesFound === 0) {
        Debug.log('No old caches found');
    } else {
        Debug.log(`${letCachesFound} Old caches cleared`);

    }
};

/**
 * @param { Event & {waitUntil : (Promise) =>Promise  }} activationEvent
 * @return {Promise<void>}
 */
const activateEventHandler = async (activationEvent) => {
    Debug.log(`[Service Worker] Activating Service Worker version ${swConstants.version} ....`);
    await activationEvent.waitUntil(clearCaches());
    return self.clients.claim();
};
/**
 *
 * @return {Promise<void>}
 */
const installEventHandler = async () => {
    Debug.log(`[Service Worker] Installing Service Worker ${swConstants.swName}`);
    return self.skipWaiting();
};


const fetchRequestAndCache = async (request) => {
    const response = await fetch(request);
    const cache = await caches.open(swConstants.CACHE_NAME);
    if (!request.url.includes('@')) {
        // don't cache in development mode (the @ is used for the vite
        // server files)
        Debug.log('[Service Worker] Caching resource: ' + request.url);
        await cache.put(request, response.clone());
    }

    return response;
};

const fetchEventHandler2 = async (fetchEvent) => {
    const cachedResponse = await caches.match(fetchEvent.request);
    if (cachedResponse) {
        Debug.debounceLog('[Service Worker] From cache: ' + fetchEvent.request.url);
        return cachedResponse;
    } else {
        const responseFromFetch = await fetch(fetchEvent.request);
        const cache = await caches.open(swConstants.CACHE_NAME);
        if (!fetchEvent.request.url.includes('@')) {
            // don't cache in development mode (the @ is used for the vite
            // server files)
            Debug.log('[Service Worker] Caching resource: ' + fetchEvent.request.url);
            cache.put(fetchEvent.request, responseFromFetch.clone()).then();
            return responseFromFetch;
        }
    }
};
const fetchEventHandler3 = (fetchEvent) => {
    return new Promise((resolve) => {


        caches.match(fetchEvent.request).then((fetchResponse) => {
            if (fetchResponse) {
                Debug.debounceLog('[Service Worker] From cache: ' +
                    fetchEvent.request.url);
                return resolve(fetchResponse);
            }
            return fetch(fetchEvent.request).then((response) => {
                return caches.open(swConstants.CACHE_NAME).then((cache) => {
                    if (!fetchEvent.request.url.includes('@')) {
                        // don't cache in development mode (the @ is used for the vite
                        // server files)
                        Debug.log('[Service Worker] Caching resource: ' +
                            fetchEvent.request.url);
                        cache.put(fetchEvent.request, response.clone());
                    }

                    return resolve(response);
                });
            });
        });
    })
}

/**
 * @param {FetchEvent} fetchEvent
 * @return {Promise<FetchEvent>}
 */
const fetchEventHandler = async (fetchEvent) => {
    fetchEvent.respondWith(
        fetchEventHandler3(fetchEvent)

    //     new Promise((resolve) => {
    //
    //
    //     caches.match(fetchEvent.request).then((fetchResponse) => {
    //         if (fetchResponse) {
    //             Debug.debounceLog('[Service Worker] From cache: ' +
    //                 fetchEvent.request.url);
    //             return resolve(fetchResponse);
    //         }
    //         return fetch(fetchEvent.request).then((response) => {
    //             return caches.open(swConstants.CACHE_NAME).then((cache) => {
    //                 if (!fetchEvent.request.url.includes('@')) {
    //                     // don't cache in development mode (the @ is used for the vite
    //                     // server files)
    //                     Debug.log('[Service Worker] Caching resource: ' +
    //                         fetchEvent.request.url);
    //                     cache.put(fetchEvent.request, response.clone());
    //                 }
    //
    //                 return resolve(response);
    //             });
    //         });
    //     });
    // })
    );
};


self.addEventListener('activate', activateEventHandler);

self.addEventListener('install', installEventHandler);

self.addEventListener('fetch', fetchEventHandler);

self.addEventListener('message', (event) => {
    console.log(event);
});

