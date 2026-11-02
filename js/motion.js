// ENJ0Y motion system: scroll reveals only. Page transitions and the hero entrance are pure CSS (global.css).
// Content is never hidden unless this script runs, so a JS failure leaves everything visible.
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches || !("IntersectionObserver" in window)) return;

  const UNITS = ".page-card, .faq-item, .pomas-gallery, .page-notice, .page-list, .page-section > .rounded-xl, .link-hub-main > *";
  const isLeafSection = s => !s.matches(".page-grid, .page-card") &&
    !s.querySelector(".page-card, .page-list, .faq-item, .pomas-gallery, .rounded-xl");

  // Pick one reveal unit per region so nested elements never animate twice.
  const picked = [];
  document.querySelectorAll(`.page-section, .page-section-title, ${UNITS}`).forEach(el => {
    if (el.matches(".page-section") && !el.matches(UNITS) && !isLeafSection(el)) return;
    if (picked.some(p => p.contains(el))) return;
    picked.push(el);
  });

  // Anything already on screen is left alone: no hide-then-show flash after first paint.
  const fold = window.innerHeight - 36;
  const targets = picked.filter(el => el.getBoundingClientRect().top >= fold);
  if (!targets.length) return;

  const seen = new Map();
  targets.forEach(el => {
    const n = seen.get(el.parentElement) || 0;
    seen.set(el.parentElement, n + 1);
    el.dataset.reveal = "";
    if (n % 3) el.dataset.revealDelay = String(n % 3); // stagger by column
  });
  document.documentElement.classList.add("motion-ready");

  // After the reveal, drop the reveal attributes so hover transitions on the element work normally.
  const settle = el => {
    delete el.dataset.reveal; delete el.dataset.revealed; delete el.dataset.revealDelay;
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.dataset.revealed = "true";
      obs.unobserve(el);
      let done = false;
      const finish = () => { if (!done) { done = true; settle(el); } };
      el.addEventListener("transitionend", e => { if (e.target === el && e.propertyName === "transform") finish(); });
      setTimeout(finish, 1000); // fallback if transitionend never fires
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

  targets.forEach(el => observer.observe(el));
})();
