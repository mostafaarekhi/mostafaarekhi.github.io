"use strict";

const filters = document.querySelector(".filters");
const filterButtons = Array.from(filters.querySelectorAll("button"));
const projects = Array.from(document.querySelectorAll(".project"));
const filterStatus = document.querySelector("#filter-status");
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const formatCount = new Intl.NumberFormat("fa-IR");
const projectGrid = document.querySelector(".project-grid");
const galleryNav = document.querySelector(".gallery-nav");
const galleryButtons = galleryNav?.querySelectorAll("button");
const galleryCount = galleryNav?.querySelector(".gallery-count");

function galleryPosition() {
  const visible = projects.filter((project) => !project.hidden);
  const edge = projectGrid.getBoundingClientRect().right;
  const index = visible.findIndex((project) => project.getBoundingClientRect().right <= edge + project.offsetWidth / 2);
  return { visible, index: Math.max(0, index) };
}

function syncGallery() {
  if (!galleryNav) return;
  const { visible, index } = galleryPosition();
  galleryButtons[0].setAttribute("aria-disabled", String(index === 0));
  galleryButtons[1].setAttribute("aria-disabled", String(index >= visible.length - 1));
  const count = `${formatCount.format(index + 1)} از ${formatCount.format(visible.length)}`;
  if (galleryCount.value === count) return;
  galleryCount.value = count;
  galleryNav.style.setProperty("--gallery-index", index);
  galleryNav.style.setProperty("--gallery-count", visible.length);
}

function stepGallery(step) {
  const { visible, index } = galleryPosition();
  const target = visible[index + step];
  if (target) scrollToProject(visible, target);
}

function scrollToProject(visible, target) {
  const left = target.getBoundingClientRect().right - visible[0].getBoundingClientRect().right;
  projectGrid.scrollTo({ left, behavior: motion.matches ? "instant" : "smooth" });
}

function bindGalleryGestures() {
  let gesture;
  let suppressClick = false;
  let lastWheelStep = -Infinity;

  projectGrid.addEventListener("dragstart", (event) => event.preventDefault());
  projectGrid.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    gesture = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: projectGrid.scrollLeft,
      ...galleryPosition(),
    };
  });
  projectGrid.addEventListener("pointermove", (event) => {
    if (gesture?.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        gesture = undefined;
        return;
      }
      if (Math.abs(dx) < 8) return;
      gesture.dragging = true;
      suppressClick = true;
      projectGrid.dataset.dragging = "";
      projectGrid.setPointerCapture(event.pointerId);
    }
    projectGrid.scrollLeft = gesture.left - dx;
  });

  function finishDrag(event) {
    if (gesture?.id !== event.pointerId) return;
    const { dragging, index, visible, x } = gesture;
    gesture = undefined;
    if (!dragging) return;
    delete projectGrid.dataset.dragging;
    const distance = event.clientX - x;
    const threshold = Math.min(60, projectGrid.clientWidth * .12);
    const step = event.type === "pointerup" && Math.abs(distance) >= threshold ? Math.sign(distance) : 0;
    scrollToProject(visible, visible[index + step] ?? visible[index]);
  }

  projectGrid.addEventListener("pointerup", finishDrag);
  projectGrid.addEventListener("pointercancel", finishDrag);
  projectGrid.addEventListener("pointerleave", () => {
    if (gesture && !gesture.dragging) gesture = undefined;
  });
  projectGrid.addEventListener("click", (event) => {
    if (!suppressClick || event.detail === 0) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  projectGrid.addEventListener("wheel", (event) => {
    if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    if (event.timeStamp - lastWheelStep < 350) {
      event.preventDefault();
      return;
    }
    const { visible, index } = galleryPosition();
    const target = visible[index + Math.sign(event.deltaY)];
    if (!target) return;
    event.preventDefault();
    lastWheelStep = event.timeStamp;
    scrollToProject(visible, target);
  }, { passive: false });
}

function showCategory(category) {
  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === category));
  }

  let visibleCount = 0;
  for (const project of projects) {
    const matches = project.dataset.category === category;
    project.hidden = !matches;
    if (!matches) continue;

    if (!motion.matches) {
      project.getAnimations().forEach((animation) => animation.cancel());
      project.animate(
        [{ opacity: 0.55, transform: "translateY(9px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 240, delay: visibleCount * 24, easing: "ease-out", fill: "backwards" }
      );
    }
    visibleCount += 1;
  }
  filterStatus.textContent = formatCount.format(visibleCount) + " پروژه نمایش داده می‌شود.";
  projectGrid?.scrollTo({ left: 0, behavior: "instant" });
  syncGallery();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (button && button.getAttribute("aria-pressed") !== "true") {
    showCategory(button.dataset.filter);
  }
});
filters.hidden = false;

if (galleryNav && projectGrid) {
  projectGrid.dataset.carousel = "";
  galleryNav.hidden = false;
  bindGalleryGestures();
  projectGrid.addEventListener("scroll", syncGallery, { passive: true });
  projectGrid.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    stepGallery(event.key === "ArrowLeft" ? 1 : -1);
  });
  window.addEventListener("resize", syncGallery);
  for (const button of galleryButtons) {
    button.addEventListener("click", () => stepGallery(Number(button.dataset.galleryStep)));
  }
  syncGallery();
}

const dialog = document.querySelector("#detail-dialog");
const dialogImage = dialog.querySelector(".dialog-image");
const dialogTitle = dialog.querySelector("#dialog-title");
const dialogLabel = dialog.querySelector("#dialog-label");
const dialogCopy = dialog.querySelector("#dialog-copy");

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

function showDialog({ title, label, description, photo }) {
  dialogTitle.textContent = title;
  dialogLabel.textContent = label;
  dialogCopy.textContent = description;
  dialogImage.src = photo.currentSrc || photo.src;
  dialogImage.alt = photo.alt;
  dialogImage.hidden = false;
  dialog.showModal();
}

for (const project of projects) {
  const button = project.querySelector(".project-open");
  button.hidden = false;
  button.addEventListener("click", () => {
    showDialog({
      title: project.querySelector("h3").textContent,
      label: project.querySelector(".project-type").textContent,
      description: project.querySelector(".project-description").textContent,
      photo: project.querySelector("img"),
    });
  });
}

// The site only displays contact channels with a configured destination.
const contactLinks = {
  phone: "tel:+989338987799",
  telegram: "https://t.me/safaarekhi",
  instagram: "https://www.instagram.com/safaarekhi_arch/",
};

for (const link of document.querySelectorAll("[data-contact]")) {
  const destination = contactLinks[link.dataset.contact];
  if (!destination) continue;
  link.href = destination;
  link.hidden = false;
}

if (Object.values(contactLinks).some(Boolean)) {
  for (const entry of document.querySelectorAll("[data-contact-entry]")) {
    entry.hidden = false;
  }
}

const header = document.querySelector(".site-header");
if (header) {
  const navigation = Array.from(header.querySelectorAll('a[href^="#"]:not(.brand):not([hidden])'), (link) => ({
    link,
    section: document.getElementById(link.hash.slice(1)),
  }));
  let activeLink;
  let frame = 0;

  function updateNavigation() {
    frame = 0;
    header.classList.toggle("is-scrolled", window.scrollY > 32);
    const readingLine = Math.max(header.offsetHeight + 28, window.innerHeight * .28);
    const atBottom = window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3;
    const current = atBottom
      ? navigation.at(-1)
      : navigation.findLast(({ section }) => section && section.getBoundingClientRect().top <= readingLine);
    if (!current || current.link === activeLink) return;
    activeLink?.removeAttribute("aria-current");
    current.link.setAttribute("aria-current", "location");
    activeLink = current.link;
  }

  function scheduleNavigationUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateNavigation);
  }

  activeLink = header.querySelector("[aria-current]");
  window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
  window.addEventListener("resize", scheduleNavigationUpdate);
  updateNavigation();
}

if ("IntersectionObserver" in window && !motion.matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-revealed");
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: .09, rootMargin: "0px 0px 25px 0px" });

  for (const element of document.querySelectorAll("#work .section-heading, .tools-layout, .about-visual, .about-copy, .contact")) {
    element.classList.add("scroll-reveal");
    revealObserver.observe(element);
  }
}
