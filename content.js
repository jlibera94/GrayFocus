(() => {
  const site = location.hostname;

  function applyGrayscale(enabled) {
    document.documentElement.classList.toggle('grayfocus-grayscale', enabled);
  }

  chrome.storage.local.get(site, result => {
    applyGrayscale(Boolean(result[site]));
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes[site]) {
      applyGrayscale(Boolean(changes[site].newValue));
    }
  });
})();
