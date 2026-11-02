(() => {
  const overlay = document.querySelector("[data-site-loader]");
  if (!overlay) return;

  const params = new URLSearchParams(window.location.search);
  const demoMode = params.get("loader-demo") === "1";
  const startedAt = performance.now();
  const minimumVisibleMs = demoMode ? 10000 : 320;
  let finished = false;

  // Demo mode deliberately holds the branded screen for 10 seconds.
  // Normal visits only wait for the real document load and a brief visual handoff.
  function finish() {
    if (finished) return;
    finished = true;
    const remaining = Math.max(0, minimumVisibleMs - (performance.now() - startedAt));
    window.setTimeout(() => {
      overlay.classList.add("is-hidden");
      document.documentElement.classList.remove("site-loading");
      window.setTimeout(() => overlay.remove(), 500);
    }, remaining);
  }

  window.addEventListener("load", finish, { once: true });
  // Avoid trapping the visitor if a third-party asset never finishes loading.
  window.setTimeout(finish, demoMode ? 15000 : 5000);
})();
