// Names of the current cache
const CACHE_NAME = 'cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// Install event to cache initial URLs
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            // Cache specific static assets
            return cache.addAll([
                // List of URLs for static assets you want to cache (e.g., index.html, main.js, style.css)
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
                        console.log('Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener('fetch', (event) => {
    // Check if the request is for an API
    if (event.request.url.includes('/items')) {
        console.log('[Service Worker] Fetch (data)', event.request.url);
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        // If the response is good, clone it and store it in the cache.
                        if (response.status === 200) {
                            cache.put(event.request.url, response.clone());
                        }
                        return response;
                    })
                    .catch(() => {
                        // If the network request fails, try to serve from the cache.
                        return cache.match(event.request);
                    });
            })
        );
    } else {
       console.log('URL not found in cache')
    }
});
