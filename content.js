(() => {
  if (window.__universalScreenShareCompatibilityLoaded) return;
  window.__universalScreenShareCompatibilityLoaded = true;

  const STYLE_ID = "ussc-video-compat-style";
  const SELECTOR = "video";
  let enabled = true;
  let observer;

  const apply = (video) => {
    if (!(video instanceof HTMLVideoElement)) return;
    if (!video.dataset.usscOriginalStyles) {
      video.dataset.usscOriginalStyles = JSON.stringify({
        filter: video.style.filter,
        opacity: video.style.opacity,
        mixBlendMode: video.style.mixBlendMode
      });
    }
    if (enabled) {
      // Reproduce únicamente los ajustes visuales no invasivos del proyecto de referencia.
      video.style.setProperty("filter", "sepia(0%)", "important");
      video.style.setProperty("opacity", "0.9999", "important");
      video.style.setProperty("mix-blend-mode", "normal", "important");
    } else {
      restore(video);
    }
  };

  const restore = (video) => {
    try {
      const original = JSON.parse(video.dataset.usscOriginalStyles || "{}");
      for (const [key, value] of Object.entries(original)) {
        video.style[key] = value || "";
      }
    } catch (_) {}
  };

  const scan = (root = document) => {
    if (root.querySelectorAll) root.querySelectorAll(SELECTOR).forEach(apply);
    if (root.matches && root.matches(SELECTOR)) apply(root);
  };

  const setEnabled = (value) => {
    enabled = !!value;
    scan();
  };

  chrome.storage.local.get({ enabled: true }, (result) => {
    setEnabled(result.enabled);
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "USSC_SET_ENABLED") {
      setEnabled(message.enabled);
      sendResponse({ ok: true, enabled });
    }
    if (message?.type === "USSC_GET_STATUS") {
      sendResponse({
        enabled,
        videos: document.querySelectorAll(SELECTOR).length,
        url: location.hostname
      });
    }
    return true;
  });

  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => scan(node));
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();
