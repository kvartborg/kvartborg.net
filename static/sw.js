/* global importScripts, workbox, self */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

/**
 * Precache
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

/**
 * Pages which should be cached after visit
 */
const pagecache = [
  '/',
  '/projects',
  '/blog',
  '/blog/'
]

pagecache.forEach(url => {
  workbox.routing.registerRoute(url, workbox.strategies.networkFirst({
    cacheName: 'page-cache'
  }))
})

// /**
//  * Cache default not-found page on sw install
//  */
// self.addEventListener('install', event => {
//   const url = '/not-found'
//   event.waitUntil(
//     fetch(url)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error(res.statusText)
//         }
//
//         return caches.open('page-cache')
//           .then(cache => cache.put(url, res.clone()))
//       })
//   )
// })
//
// /**
//  * [event description]
//  * @type {[type]}
//  */
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(res => res || caches.match('/not-found'))
//   )
// })

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
 * Cache typekit fonts
 */
workbox.routing.registerRoute(
  /https:\/\/use.typekit.net(.*)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-cache'
  })
)

/**
 * Cache images
 */
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
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
