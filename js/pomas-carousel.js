(() => {
  const carousel = document.querySelector("#pomas-carousel");
  if (!carousel) return;
  const gallery = carousel.closest(".pomas-gallery");
  const slides = [...carousel.querySelectorAll(".pomas-slide")];
  const count = gallery.querySelector(".pomas-gallery-count");
  const dots = [...gallery.querySelectorAll("[data-go]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let active = 0;
  let timer = null;
  let paused = false;

  function show(index, behavior = "smooth") {
    active = (index + slides.length) % slides.length;
    carousel.scrollTo({ left: active * carousel.clientWidth, behavior: reducedMotion.matches ? "auto" : behavior });
    count.textContent = `${active + 1} / ${slides.length}`;
    dots.forEach((dot, i) => {
      if (i === active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function stop() { if (timer) window.clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (paused || reducedMotion.matches) return;
    timer = window.setInterval(() => show(active + 1), 4500);
  }

  gallery.querySelectorAll("[data-direction]").forEach(button => {
    button.addEventListener("click", () => { show(active + Number(button.dataset.direction)); start(); });
  });
  dots.forEach(dot => dot.addEventListener("click", () => { show(Number(dot.dataset.go)); start(); }));
  carousel.addEventListener("scroll", () => {
    const nearest = slides.reduce((best, slide, i) =>
      Math.abs(i * carousel.clientWidth - carousel.scrollLeft) < Math.abs(best * carousel.clientWidth - carousel.scrollLeft) ? i : best, 0);
    if (nearest !== active) {
      active = nearest;
      count.textContent = `${active + 1} / ${slides.length}`;
      dots.forEach((dot, i) => i === active ? dot.setAttribute("aria-current", "true") : dot.removeAttribute("aria-current"));
    }
  }, { passive: true });
  gallery.addEventListener("mouseenter", () => { paused = true; stop(); });
  gallery.addEventListener("mouseleave", () => { paused = false; start(); });
  gallery.addEventListener("focusin", () => { paused = true; stop(); });
  gallery.addEventListener("focusout", event => {
    if (!gallery.contains(event.relatedTarget)) { paused = false; start(); }
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  reducedMotion.addEventListener?.("change", start);
  show(0, "auto");
  start();
})();
