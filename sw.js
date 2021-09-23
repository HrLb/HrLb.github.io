var cacheName = 'hello-pwa';
var filesToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {

    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
        .then(device => { console.log("Succes"); })
        .catch(error => { console.log("Error") });

    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});





/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {

    console.log("start");
    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
        .then(device => { document.getElementById("message").innerHTML = "Succes 2"; })
        .catch(error => { document.getElementById("message").innerHTML = "Error 2"; });
    console.log("done");

    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});