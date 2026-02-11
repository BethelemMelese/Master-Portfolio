// Placeholder Firebase Messaging service worker.
// Replace this with real messaging handlers when Firebase Cloud Messaging is configured.
self.addEventListener('push', () => {
  // No-op: implemented to satisfy browsers that expect a handler.
})

self.addEventListener('notificationclick', (event) => {
  event.notification?.close?.()
})
