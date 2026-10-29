const root = document.documentElement;
const toggle = document.querySelector("#theme-toggle");
const preferenceKey = "enj0y-theme";

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.dataset.theme = theme;
  }
  const active = theme === "system" ? systemTheme() : theme;
  if (toggle) {
    toggle.setAttribute("aria-label", active === "dark" ? "Switch to light theme" : "Switch to dark theme");
    toggle.setAttribute("title", active === "dark" ? "Switch to light theme" : "Switch to dark theme");
    const icon = toggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = active === "dark" ? "light_mode" : "dark_mode";
  }
}

const savedTheme = localStorage.getItem(preferenceKey);
applyTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "system");

toggle?.addEventListener("click", () => {
  const explicit = root.dataset.theme;
  const current = explicit || systemTheme();
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(preferenceKey, next);
  applyTheme(next);
});
