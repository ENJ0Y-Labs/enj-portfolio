const carousel = document.querySelector("#pomas-carousel");
if (carousel) {
  const images = [...carousel.querySelectorAll("img")];
  const dialog = document.createElement("dialog");
  dialog.className = "gallery-lightbox";
  dialog.setAttribute("aria-label", "Pomas screenshot viewer");
  dialog.innerHTML = '<div class="gallery-lightbox-inner"><button class="gallery-lightbox-close" type="button" aria-label="Close image viewer">×</button><button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Previous image">‹</button><figure><img class="gallery-lightbox-image" alt=""><figcaption class="gallery-lightbox-caption"></figcaption></figure><button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Next image">›</button></div>';
  document.body.append(dialog);
  const preview = dialog.querySelector(".gallery-lightbox-image");
  const caption = dialog.querySelector(".gallery-lightbox-caption");
  let activeIndex = 0;
  const show = index => {
    activeIndex = (index + images.length) % images.length;
    const source = images[activeIndex];
    preview.src = source.currentSrc || source.src;
    preview.alt = source.alt;
    caption.textContent = `Pomas desktop screenshot ${activeIndex + 1} of ${images.length}`;
    dialog.querySelector(".gallery-lightbox-prev").disabled = images.length < 2;
    dialog.querySelector(".gallery-lightbox-next").disabled = images.length < 2;
  };
  const open = index => { show(index); if (!dialog.open) dialog.showModal(); };
  images.forEach((img, index) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `Open full-size view: ${img.alt}`);
    img.addEventListener("click", () => open(index));
    img.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(index); }
    });
  });
  dialog.querySelector(".gallery-lightbox-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".gallery-lightbox-prev").addEventListener("click", () => show(activeIndex - 1));
  dialog.querySelector(".gallery-lightbox-next").addEventListener("click", () => show(activeIndex + 1));
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(activeIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(activeIndex + 1); }
  });
}
