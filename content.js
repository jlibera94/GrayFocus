(() => {
  const site = location.hostname;
  const style = document.createElement('style');
  style.id = 'grayfocus-style';
  style.textContent = 'html { filter: grayscale(100%) !important; }';

  function applyGrayscale(enabled) {
    if (enabled) {
      if (!style.isConnected) {
        (document.head || document.documentElement).appendChild(style);
      }
    } else {
      style.remove();
    }
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
