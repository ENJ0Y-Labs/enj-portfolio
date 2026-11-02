(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealTargets = [
    ".home-hero",
    ".page-intro",
    ".page-section",
    ".page-grid > .page-card",
    ".faq-item",
    ".pomas-gallery",
    ".page-notice",
    ".link-hub-main > *"
  ];
  const elements = [...new Set(revealTargets.flatMap(selector => [...document.querySelectorAll(selector)]))];

  if (!elements.length || reduceMotion.matches) return;
  elements.forEach((element, index) => {
    element.dataset.reveal = "";
    if (element.matches(".page-grid > .page-card, .faq-item, .link-hub-main > *")) {
      element.dataset.revealDelay = String(Math.min(index % 4, 3));
    }
  });

  document.documentElement.classList.add("motion-ready");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => { element.dataset.revealed = "true"; });
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.dataset.revealed = "true";
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  elements.forEach(element => observer.observe(element));
})();
