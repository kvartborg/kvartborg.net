/* global caches, workbox, self */

/**
 * Precache page
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

/**
 * Cache js and css
 */
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-cache'
  })
)

/**
 * Cache typekit and font-awesome fonts
 */
workbox.routing.registerRoute(
  /https:\/\/(?:use.fontawesome.com|use.typekit.net)\/(.*)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-cache'
  })
)

/**
 * Cache images
 */
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'static-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)

/**
 * Cache markdown files
 */
workbox.routing.registerRoute(
  /\.(?:md)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'static-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 Days
      })
    ]
  })
)

/**
 * Cache json
 */
workbox.routing.registerRoute(
  /\.(?:json)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'json-cache'
  })
)

/**
 * Intercept all requests and return the app shell
 */
workbox.routing.registerRoute(
  /\/(.*)/,
  event => caches.match('/shell.html')
)
