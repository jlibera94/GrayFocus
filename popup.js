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

  async function applyToCurrentTab(value) {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['grayscale.css']
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: grayscaleEnabled => {
        document.documentElement.classList.toggle('grayfocus-grayscale', grayscaleEnabled);
      },
      args: [value]
    });
  }

  function render() {
    status.textContent = enabled ? 'Grayscale is ON for this site' : 'Grayscale is OFF for this site';
    button.textContent = enabled ? 'Turn OFF' : 'Turn ON';
  }

  chrome.storage.local.get(site, result => {
    enabled = Boolean(result[site]);
    button.disabled = false;
    render();
    applyToCurrentTab(enabled).catch(() => {
      status.textContent = 'Could not update this page. Reload and try again.';
    });
  });

  button.addEventListener('click', () => {
    button.disabled = true;
    const nextEnabled = !enabled;
    chrome.storage.local.set({ [site]: nextEnabled }, async () => {
      if (chrome.runtime.lastError) {
        status.textContent = 'Could not save preference.';
      } else {
        try {
          await applyToCurrentTab(nextEnabled);
          enabled = nextEnabled;
          render();
        } catch {
          status.textContent = 'Could not update this page. Reload and try again.';
        }
      }
      button.disabled = false;
    });
  });
});
