const ICONS = {
  on: {
    16: "icons/icon-on-16.png",
    32: "icons/icon-on-32.png",
    48: "icons/icon-on-48.png",
    128: "icons/icon-on-128.png"
  },
  off: {
    16: "icons/icon-off-16.png",
    32: "icons/icon-off-32.png",
    48: "icons/icon-off-48.png",
    128: "icons/icon-off-128.png"
  }
};

async function syncIcon() {
  const { enabled = true } = await chrome.storage.local.get({ enabled: true });
  await chrome.action.setIcon({ path: enabled ? ICONS.on : ICONS.off });
  await chrome.action.setTitle({
    title: enabled
      ? "Universal ScreenShare — Activado"
      : "Universal ScreenShare — Desactivado"
  });
}

chrome.runtime.onInstalled.addListener(syncIcon);
chrome.runtime.onStartup.addListener(syncIcon);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "USSC_UPDATE_ICON") {
    chrome.action.setIcon({ path: message.enabled ? ICONS.on : ICONS.off })
      .then(() => chrome.action.setTitle({
        title: message.enabled
          ? "Universal ScreenShare — Activado"
          : "Universal ScreenShare — Desactivado"
      }))
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.enabled) syncIcon();
});
