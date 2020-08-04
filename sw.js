const IMAGE_COUNT = 100;

const imagePaths = new Array(IMAGE_COUNT).fill().map((_, index) => {
  const prefix = `${index}`.padStart(2, "0");
  return `https://robohash.org/${prefix}.png?size=100x100`;
});

const urlsToCache = ["/"].concat(imagePaths);

const CACHE_NAME = "v1";

self.addEventListener("install", (e) => {
  console.info("install", e);

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  // console.info("fetch", e);

  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        console.info(`Cache: ${e.request.url}`);
        return response;
      }
      return fetch(e.request);
    })
  );
});
