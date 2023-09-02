// Define a unique cache name for this version of the service worker
const CACHE_NAME = 'my-pwa-cache-v1';

// List of URLs to cache
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json',
    'icon.png',
    // Add more URLs to cache here
];

// Install event: Caches the specified assets when the service worker is installed
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event: Delete outdated caches when a new service worker version is activated
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve cached assets when possible, otherwise fetch from the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
