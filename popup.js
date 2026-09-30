const button = document.getElementById('toggle');
const status = document.getElementById('status');

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  let site;
  try {
    const url = new URL(tab?.url);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported page');
    site = url.hostname;
  } catch {
    status.textContent = 'Unavailable on this page.';
    button.textContent = 'Not supported';
    return;
  }

  let enabled = false;
  function render() {
    status.textContent = enabled ? 'Grayscale is ON for this site' : 'Grayscale is OFF for this site';
    button.textContent = enabled ? 'Turn OFF' : 'Turn ON';
  }

  chrome.storage.local.get(site, result => {
    enabled = Boolean(result[site]);
    button.disabled = false;
    render();
  });

  button.addEventListener('click', () => {
    button.disabled = true;
    chrome.storage.local.set({ [site]: !enabled }, () => {
      if (chrome.runtime.lastError) {
        status.textContent = 'Could not save preference.';
      } else {
        enabled = !enabled;
        render();
      }
      button.disabled = false;
    });
  });
});
