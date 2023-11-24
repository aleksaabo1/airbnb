// Names of the current cache
const CACHE_NAME = 'cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// Install event to cache initial URLs
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force the waiting service worker to become the active service worker.
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
    // Define URL patterns that need special handling
    const patterns = ['/items', '/images', '/rentals/description', '/rentals/bedrooms', '/rentals/reviews', '/rentals/hosts'];

    // Check if the request URL matches any of the patterns
    const shouldHandleRequest = patterns.some(pattern => event.request.url.includes(pattern));

    if (shouldHandleRequest) {
        console.log('[Service Worker] Fetch (data)', event.request.url);
        event.respondWith(CacheFist(event.request));
    }
});

function CacheFist(request) {
    return caches.match(request)
        .then(cachedResponse => {
            if (cachedResponse) {
                console.log('Returning cached response', cachedResponse);
                return cachedResponse;
            }
            return fetchAndCache(request);
        })
        .catch(() => {
            console.log("Network request failed");
            // Optionally, return a fallback response here
        });
}

function fetchAndCache(request) {
    return fetch(request).then(response => {
        // Check if the response is valid to cache
        if (!response || response.status !== 200 || response.type !== 'cors') {
            console.log("Not a valid response for caching");
            return response;
        }

        // Cache the response
        const responseToCache = response.clone();
        caches.open(DATA_CACHE_NAME).then(cache => {
            console.log("Caching response", responseToCache);
            cache.put(request, responseToCache);
        });
        return response;
    });
}

// service-worker.js
self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon.png'
    });
});
