const toggleButton = document.getElementById("toggleButton");
const stateLabel = document.getElementById("stateLabel");
const headline = document.getElementById("headline");
const hint = document.getElementById("hint");
const videoCount = document.getElementById("videoCount");
const shortStatus = document.getElementById("shortStatus");
const siteName = document.getElementById("siteName");

let enabled = true;

function renderState(value) {
  enabled = Boolean(value);
  document.body.classList.toggle("enabled", enabled);
  toggleButton.setAttribute("aria-pressed", String(enabled));
  stateLabel.textContent = enabled ? "ACTIVADO" : "DESACTIVADO";
  headline.textContent = enabled ? "Ajustes visuales activos" : "Ajustes visuales pausados";
  hint.textContent = enabled ? "Pulsa el botón para desactivar" : "Pulsa el botón para activar";
}

async function refresh() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    siteName.textContent = "No hay pestaña activa";
    videoCount.textContent = "—";
    shortStatus.textContent = "No disponible";
    return;
  }

  try {
    const url = new URL(tab.url);
    siteName.textContent = url.hostname;
  } catch {
    siteName.textContent = "Página no compatible";
  }

  try {
    const result = await chrome.tabs.sendMessage(tab.id, { type: "USSC_GET_STATUS" });
    videoCount.textContent = String(result.videos);
    shortStatus.textContent = "Conectado";
  } catch {
    videoCount.textContent = "—";
    shortStatus.textContent = "No disponible";
  }
}

chrome.storage.local.get({ enabled: true }, ({ enabled: saved }) => {
  renderState(saved);
  refresh();
});

toggleButton.addEventListener("click", async () => {
  const next = !enabled;
  renderState(next);
  await chrome.storage.local.set({ enabled: next });

  // Mantiene sincronizado el icono de la barra de Chrome.
  try {
    await chrome.runtime.sendMessage({ type: "USSC_UPDATE_ICON", enabled: next });
  } catch (_) {}

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: "USSC_SET_ENABLED", enabled: next });
    } catch (_) {}
  }
  refresh();
});
