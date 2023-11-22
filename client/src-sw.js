// Define workbox modules
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// precache and route assets, ensures that assets used by the 
//service worker are cached and can be used offline
precacheAndRoute(self.__WB_MANIFEST);

// set up cache strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with HTTP statuses 0 (error) and 200 (success)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Expire page cache after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// cache the index.html page and the root/home route using the pageCache strategy
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// use the pageCache strategy for all navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// registerRoute(
//   ({ request }) => ["style", "script", "worker"].includes(request.destination),
//   new StaleWhileRevalidate({cacheName: "asset-cache",plugins: [new CacheableResponsePlugin({statuses: [0, 200]})]})
// );
// register route for caching assets, using the StaleWhileRevalidate strategy,
// which will use the cached content if available, otherwise fetch from the network
registerRoute(
  ({ request }) =>
    request.destination === 'script' || // cache javascript files
    request.destination === 'style' || // cache css files
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

