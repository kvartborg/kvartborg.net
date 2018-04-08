/* global importScripts, workbox, self */

/**
 * Precache page
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest)

/**
 * Cache js and css
 */
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'static-cache'
  })
)

/**
 * Cache typekit fonts
 */
workbox.routing.registerRoute(
  /https:\/\/(?:use.fontawesome.com|use.typekit.net)\/(.*)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-cache'
  })
)

/**
 * Cache js and css
 */
workbox.routing.registerRoute(
  /\/(.*)/,
  event => caches.match('/shell.html')
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
