const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'باز کردن منو'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.app-header')) closeMenu(); });
const navLinks = [...navigation.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id)); }); }, { rootMargin: '-15% 0px -55% 0px' });
navLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) sectionObserver.observe(section); });
const projectGrid = document.querySelector('.project-grid');
const shuffledCards = [...projectGrid.querySelectorAll('.project-card')];
// Fisher–Yates: a fresh permutation, with each project included exactly once.
for (let i = shuffledCards.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
}
projectGrid.replaceChildren(...shuffledCards);
const cards = shuffledCards;
const feedback = document.querySelector('.video-feedback');
const playbackPositions = new WeakMap();
function releaseVideo(video) {
 if (!video.getAttribute('src')) return;
 playbackPositions.set(video, video.currentTime);
 video.pause();
 video.removeAttribute('src');
 video.load();
}
cards.forEach(card => {
 const video = card.querySelector('video');
 const toggle = card.querySelector('.video-toggle');
 const label = video.getAttribute('aria-label');
 const setBuffering = buffering => {
  card.classList.toggle('is-buffering', buffering);
  card.querySelector('.project-media').setAttribute('aria-busy', String(buffering));
 };
 video.addEventListener('loadedmetadata', () => {
  const saved = playbackPositions.get(video) || 0;
  if (saved > 0 && saved < video.duration - .1) video.currentTime = saved;
 });
 video.addEventListener('waiting', () => { if (!video.paused) setBuffering(true); });
 ['playing','pause','ended','error'].forEach(event => video.addEventListener(event, () => setBuffering(false)));
 const syncPlayback = () => {
  card.classList.toggle('is-playing', !video.paused);
  toggle.setAttribute('aria-pressed', String(!video.paused));
  toggle.setAttribute('aria-label', video.paused ? label : label.replace('پخش', 'توقف'));
  toggle.querySelector('use').setAttribute('href', video.paused ? '#play' : '#pause');
 };
 const togglePlayback = () => {
  if (!video.paused) { video.pause(); return; }
  cards.forEach(other => { if (other !== card) releaseVideo(other.querySelector('video')); });
  setBuffering(true);
  if (!video.getAttribute('src')) { video.preload = 'auto'; video.src = video.dataset.src; video.load(); }
  video.play().catch(error => { setBuffering(false); if (error.name !== 'AbortError') feedback.textContent = 'پخش ویدیو ممکن نشد. دوباره تلاش کن.'; });
 };
 toggle.addEventListener('click', togglePlayback);
 video.addEventListener('click', togglePlayback);
 ['play','pause','ended'].forEach(event => video.addEventListener(event, syncPlayback));
 video.addEventListener('play', () => { feedback.textContent = ''; cards.forEach(other => { if (other !== card) other.querySelector('video').pause(); }); });
 video.addEventListener('error', () => { feedback.textContent = 'دریافت یکی از ویدیوها ممکن نشد. صفحه را دوباره بارگذاری کن.'; });
});
const mediaObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (!entry.isIntersecting) releaseVideo(entry.target); }); });
cards.forEach(card => mediaObserver.observe(card.querySelector('video')));
// Posters are independent; fetch video bytes only after a play request.

const previousProjects = document.querySelector('.project-prev');
const nextProjects = document.querySelector('.project-next');
const projectPosition = document.querySelector('.project-position');
const numberFa = new Intl.NumberFormat('fa');
let activeProject = 0, projectsPerView = 1, sliderFrame = null;
function updateProjectSlider() {
 const gap = parseFloat(getComputedStyle(projectGrid).columnGap) || 0;
 const step = cards[0].getBoundingClientRect().width + gap;
 projectsPerView = Math.max(1, Math.round((projectGrid.clientWidth + gap) / step));
 activeProject = Math.min(cards.length - projectsPerView, Math.max(0, Math.round(Math.abs(projectGrid.scrollLeft) / step)));
 previousProjects.disabled = activeProject === 0;
 nextProjects.disabled = activeProject >= cards.length - projectsPerView;
 const end = Math.min(cards.length, activeProject + projectsPerView);
 projectPosition.textContent = projectsPerView === 1
  ? numberFa.format(activeProject + 1) + ' از ' + numberFa.format(cards.length)
  : numberFa.format(activeProject + 1) + ' تا ' + numberFa.format(end) + ' از ' + numberFa.format(cards.length);
}
function moveProjects(index) {
 const target = Math.max(0, Math.min(cards.length - projectsPerView, index));
 const step = cards[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(projectGrid).columnGap) || 0);
 projectGrid.scrollTo({ left: -target * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
previousProjects.addEventListener('click', () => moveProjects(activeProject - projectsPerView));
nextProjects.addEventListener('click', () => moveProjects(activeProject + projectsPerView));
// Touch uses browser-native scrolling; only mouse dragging is handled here.
let projectDrag = null, suppressProjectClickUntil = 0;
projectGrid.addEventListener('pointerdown', event => {
 if (event.pointerType !== 'mouse' || !event.isPrimary || event.button !== 0) return;
 if (event.target.closest('a,input,select')) return;
 projectDrag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: projectGrid.scrollLeft, moved: false };
}, { capture: true });
projectGrid.addEventListener('pointermove', event => {
 if (!projectDrag || projectDrag.id !== event.pointerId) return;
 const dx = event.clientX - projectDrag.x, dy = event.clientY - projectDrag.y;
 if (!projectDrag.moved) {
  if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { projectDrag = null; return; }
  if (Math.abs(dx) < 8) return;
  projectDrag.moved = true;
  projectGrid.classList.add('is-dragging');
  projectGrid.setPointerCapture(event.pointerId);
 }
 event.preventDefault();
 projectGrid.scrollLeft = projectDrag.left - dx;
}, { passive: false });
function finishProjectDrag(event) {
 if (!projectDrag || projectDrag.id !== event.pointerId) return;
 const moved = projectDrag.moved;
 projectDrag = null;
 projectGrid.classList.remove('is-dragging');
 if (projectGrid.hasPointerCapture(event.pointerId)) projectGrid.releasePointerCapture(event.pointerId);
 if (moved) {
  suppressProjectClickUntil = performance.now() + 350;
  const step = cards[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(projectGrid).columnGap) || 0);
  moveProjects(Math.round(Math.abs(projectGrid.scrollLeft) / step));
 }
}
projectGrid.addEventListener('pointerup', finishProjectDrag);
projectGrid.addEventListener('pointercancel', finishProjectDrag);
projectGrid.addEventListener('lostpointercapture', event => {
 if (event.target === projectGrid) finishProjectDrag(event);
});
projectGrid.addEventListener('click', event => {
 if (performance.now() < suppressProjectClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
}, { capture: true });
projectGrid.addEventListener('keydown', event => {
 if (event.target !== projectGrid) return;
 if (event.key === 'ArrowLeft') { event.preventDefault(); moveProjects(activeProject + 1); }
 if (event.key === 'ArrowRight') { event.preventDefault(); moveProjects(activeProject - 1); }
 if (event.key === 'Home') { event.preventDefault(); moveProjects(0); }
 if (event.key === 'End') { event.preventDefault(); moveProjects(cards.length - projectsPerView); }
});
projectGrid.addEventListener('scroll', () => {
 if (sliderFrame !== null) return;
 sliderFrame = requestAnimationFrame(() => { sliderFrame = null; updateProjectSlider(); });
}, { passive: true });
new ResizeObserver(updateProjectSlider).observe(projectGrid);
updateProjectSlider();

const scrubber = document.querySelector('.timeline-scrubber'), playhead = document.querySelector('.playhead'), timelineButton = document.querySelector('.timeline-play'), timecode = document.querySelector('#art-timecode');
let animationFrame = null, previousTime = 0, position = Number(scrubber.value);
let timelineInView = false, timelinePausedByUser = false;
const timelineMotion = matchMedia('(prefers-reduced-motion: reduce)');
function renderTimeline() { playhead.style.setProperty('--position', `${position / 210 * 100}%`); timecode.textContent = `00:00:${String(Math.floor(position / 30)).padStart(2, '0')}:${String(Math.floor(position % 30)).padStart(2, '0')}`; scrubber.value = position; }
function stopTimeline() { cancelAnimationFrame(animationFrame); animationFrame = null; timelineButton.setAttribute('aria-pressed', 'false'); timelineButton.setAttribute('aria-label', 'پخش تایم‌لاین'); timelineButton.querySelector('use').setAttribute('href', '#play'); }
function animateTimeline(time) { if (previousTime) position += Math.min(time - previousTime, 100) * .03; previousTime = time; if (position >= 210) position %= 210; renderTimeline(); animationFrame = requestAnimationFrame(animateTimeline); }
function startTimeline() {
 if (animationFrame !== null) return;
 previousTime = 0;
 timelineButton.setAttribute('aria-pressed', 'true');
 timelineButton.setAttribute('aria-label', 'توقف تایم‌لاین');
 timelineButton.querySelector('use').setAttribute('href', '#pause');
 animationFrame = requestAnimationFrame(animateTimeline);
}
function syncTimeline() {
 if (timelineInView && !document.hidden && !timelinePausedByUser && !timelineMotion.matches) startTimeline();
 else stopTimeline();
}
timelineButton.addEventListener('click', () => {
 timelinePausedByUser = animationFrame !== null;
 if (timelinePausedByUser) stopTimeline();
 else startTimeline();
});
new IntersectionObserver(entries => {
 timelineInView = entries[0].isIntersecting;
 syncTimeline();
}).observe(document.querySelector('.timeline-panel'));
timelineMotion.addEventListener('change', syncTimeline);
scrubber.addEventListener('input', () => { position = Number(scrubber.value); renderTimeline(); });
document.addEventListener('visibilitychange', () => { syncTimeline(); if (document.hidden) cards.forEach(card => releaseVideo(card.querySelector('video'))); });
document.querySelector('#year').textContent = new Intl.NumberFormat('fa', {useGrouping: false}).format(new Date().getFullYear());

// Run the two artwork loops only while visible and motion is allowed.
const loopPreference = matchMedia('(prefers-reduced-motion: reduce)');
const loopVisibility = new Map();
function syncArtworkLoops() {
 loopVisibility.forEach((visible, artwork) => artwork.classList.toggle('is-looping', visible && !document.hidden && !loopPreference.matches));
}
const loopObserver = new IntersectionObserver(entries => {
 entries.forEach(entry => loopVisibility.set(entry.target, entry.isIntersecting));
 syncArtworkLoops();
}, { threshold: 0 });
document.querySelectorAll('.hero-art,.about-art').forEach(artwork => { loopVisibility.set(artwork, false); loopObserver.observe(artwork); });
document.addEventListener('visibilitychange', syncArtworkLoops);
loopPreference.addEventListener('change', syncArtworkLoops);

// One entrance per element; only compositor-friendly opacity and transform.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
 const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
 }, { threshold: .08, rootMargin: '0px 0px 35px 0px' });
 document.querySelectorAll('.hero-copy,.hero-art,.timeline-panel,.projects,.project-card,.about-art,.about-copy,.services,.service-list>div,.contact-section,footer').forEach(element => {
  element.classList.add('reveal');
  revealObserver.observe(element);
 });
}

// Resize the composition as one unit; preserve the shape of every layer.
const heroArtwork = document.querySelector('.hero-art');
const sizeHeroScene = width => heroArtwork.style.setProperty('--hero-scene-scale', Math.min(1.2, width / 520));
sizeHeroScene(heroArtwork.clientWidth);
new ResizeObserver(entries => sizeHeroScene(entries[0].contentRect.width)).observe(heroArtwork);
