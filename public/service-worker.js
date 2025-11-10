self.addEventListener('install', (event) => {
  console.log('Service Worker installé');
});

self.addEventListener('fetch', (event) => {
  // tu peux gérer le cache ici si besoin
});
