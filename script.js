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
const cards = [...document.querySelectorAll('.project-card')];
const feedback = document.querySelector('.video-feedback');
cards.forEach(card => {
 const video = card.querySelector('video'), play = card.querySelector('.project-play');
 play.addEventListener('click', async () => { cards.forEach(other => { if (other !== card) other.querySelector('video').pause(); }); feedback.textContent = ''; video.controls = true; try { await video.play(); video.focus(); } catch { video.controls = false; feedback.textContent = 'ویدیو پخش نشد. اتصال اینترنت را بررسی کن و دوباره دکمه پخش را بزن.'; } });
 video.addEventListener('play', () => { cards.forEach(other => { if (other !== card) other.querySelector('video').pause(); }); card.classList.add('is-playing'); play.tabIndex = -1; });
 video.addEventListener('pause', () => { card.classList.remove('is-playing'); play.tabIndex = 0; });
 video.addEventListener('ended', () => { card.classList.remove('is-playing'); play.tabIndex = 0; video.controls = false; });
 video.addEventListener('error', () => { card.classList.remove('is-playing'); play.tabIndex = 0; feedback.textContent = 'دریافت یکی از ویدیوها ممکن نشد. صفحه را دوباره بارگذاری کن.'; });
});
const scrubber = document.querySelector('.timeline-scrubber'), playhead = document.querySelector('.playhead'), timelineButton = document.querySelector('.timeline-play'), timecode = document.querySelector('#art-timecode');
let animationFrame = null, previousTime = 0, position = Number(scrubber.value);
function renderTimeline() { playhead.style.setProperty('--position', `${position / 210 * 100}%`); timecode.textContent = `00:00:${String(Math.floor(position / 30)).padStart(2, '0')}:${String(Math.floor(position % 30)).padStart(2, '0')}`; scrubber.value = position; }
function stopTimeline() { cancelAnimationFrame(animationFrame); animationFrame = null; timelineButton.setAttribute('aria-pressed', 'false'); timelineButton.setAttribute('aria-label', 'پخش تایم‌لاین'); timelineButton.querySelector('use').setAttribute('href', '#play'); }
function animateTimeline(time) { if (previousTime) position += Math.min(time - previousTime, 100) * .03; previousTime = time; if (position >= 210) { position = 210; renderTimeline(); stopTimeline(); return; } renderTimeline(); animationFrame = requestAnimationFrame(animateTimeline); }
timelineButton.addEventListener('click', () => { if (animationFrame !== null) { stopTimeline(); return; } if (position >= 210) position = 0; previousTime = 0; timelineButton.setAttribute('aria-pressed', 'true'); timelineButton.setAttribute('aria-label', 'توقف تایم‌لاین'); timelineButton.querySelector('use').setAttribute('href', '#pause'); animationFrame = requestAnimationFrame(animateTimeline); });
scrubber.addEventListener('input', () => { position = Number(scrubber.value); renderTimeline(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { stopTimeline(); cards.forEach(card => card.querySelector('video').pause()); } });
document.querySelector('#year').textContent = new Intl.NumberFormat('fa', {useGrouping: false}).format(new Date().getFullYear());
