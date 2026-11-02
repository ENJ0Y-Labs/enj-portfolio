const root = document.documentElement;
const toggle = document.querySelector("#theme-toggle");
const preferenceKey = "enj0y-theme";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let switching = false;
function systemTheme() { return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
function updateToggle(theme) {
  const active = theme === "system" ? systemTheme() : theme;
  if (!toggle) return;
  toggle.setAttribute("aria-label", active === "dark" ? "Switch to light theme" : "Switch to dark theme");
  toggle.setAttribute("title", active === "dark" ? "Switch to light theme" : "Switch to dark theme");
  const icon = toggle.querySelector(".material-symbols-outlined");
  if (icon) icon.textContent = active === "dark" ? "light_mode" : "dark_mode";
}
function applyTheme(theme) {
  if (theme === "system") root.removeAttribute("data-theme");
  else root.dataset.theme = theme;
  updateToggle(theme);
}
function saveTheme(theme) {
  try { localStorage.setItem(preferenceKey, theme); } catch { /* Current-page switching still works. */ }
}
function buildHoneycomb(from, to) {
  const overlay = document.createElement("div");
  overlay.className = "theme-honeycomb";
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.setProperty("--tile-front", from === "dark" ? "#0f131c" : "#fff9fa");
  overlay.style.setProperty("--tile-back", to === "dark" ? "#0f131c" : "#fff9fa");
  const w = 76, h = 68;
  const columns = Math.ceil(innerWidth / (w * .75)) + 2;
  const rows = Math.ceil(innerHeight / h) + 2;
  for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
    const tile = document.createElement("span");
    tile.className = "theme-hex";
    tile.style.left = `${column * w * .75 - w / 2}px`;
    tile.style.top = `${row * h + (column % 2 ? h / 2 : 0) - h / 2}px`;
    tile.style.setProperty("--flip-delay", `${column * 34 + (row % 2) * 12}ms`);
    tile.innerHTML = '<span class="theme-hex-inner"><span class="theme-hex-face theme-hex-front"></span><span class="theme-hex-face theme-hex-back"></span></span>';
    overlay.append(tile);
  }
  overlay.style.setProperty("--flip-total", `${(columns - 1) * 34 + 650}ms`);
  document.body.append(overlay);
  return overlay;
}
function switchTheme(next) {
  if (switching) return;
  const current = root.dataset.theme || systemTheme();
  if (current === next) return;
  saveTheme(next);
  if (reducedMotion.matches) { applyTheme(next); return; }
  switching = true;
  toggle?.setAttribute("aria-busy", "true");
  const overlay = buildHoneycomb(current, next);
  requestAnimationFrame(() => overlay.classList.add("is-flipping"));
  const duration = Number.parseFloat(getComputedStyle(overlay).getPropertyValue("--flip-total")) || 1000;
  window.setTimeout(() => {
    applyTheme(next);
    overlay.classList.add("is-clearing");
    window.setTimeout(() => {
      overlay.remove();
      switching = false;
      toggle?.removeAttribute("aria-busy");
    }, 260);
  }, duration);
}
let savedTheme = null;
try { savedTheme = localStorage.getItem(preferenceKey); } catch { /* Use device preference. */ }
applyTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "system");
window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
  if (!root.dataset.theme && !switching) updateToggle("system");
});
toggle?.addEventListener("click", () => {
  const current = root.dataset.theme || systemTheme();
  switchTheme(current === "dark" ? "light" : "dark");
});
