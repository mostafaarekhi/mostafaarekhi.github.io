"use strict";

const filters = document.querySelector(".filters");
const filterButtons = Array.from(filters.querySelectorAll("button"));
const projects = Array.from(document.querySelectorAll(".project"));
const filterStatus = document.querySelector("#filter-status");
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const formatCount = new Intl.NumberFormat("fa-IR");

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
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (button && button.getAttribute("aria-pressed") !== "true") {
    showCategory(button.dataset.filter);
  }
});
filters.hidden = false;

for (const link of document.querySelectorAll("[data-feature-filter]")) {
  link.addEventListener("click", () => showCategory(link.dataset.featureFilter));
}

const dialog = document.querySelector("#detail-dialog");
const dialogImage = dialog.querySelector(".dialog-image");
const dialogTitle = dialog.querySelector("#dialog-title");
const dialogLabel = dialog.querySelector("#dialog-label");
const dialogCopy = dialog.querySelector("#dialog-copy");

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
