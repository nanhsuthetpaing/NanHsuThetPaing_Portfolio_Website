/* ====== THEME (dark/light) ====== */
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light') document.documentElement.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ====== TYPED TEXT (simple) ====== */
const typedEl = document.getElementById('typed');
const phrases = ['Frontend Developer', 'Aspiring Full-Stack Developer', 'UI / UX Enthusiast'];
let pIndex = 0, chIndex = 0, forward = true;

function typeLoop(){
  const current = phrases[pIndex];
  if (forward) {
    chIndex++;
    if (chIndex > current.length) { forward = false; setTimeout(typeLoop, 900); return; }
  } else {
    chIndex--;
    if (chIndex < 0) { forward = true; pIndex = (pIndex+1)%phrases.length; setTimeout(typeLoop, 200); return; }
  }
  typedEl.textContent = current.slice(0,chIndex);
  setTimeout(typeLoop, forward ? 60 : 40);
}
typeLoop();

/* ====== SMOOTH NAV (active link) ====== */
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('main section')];
function onScroll(){
  const pos = window.scrollY + window.innerHeight/3;
  for (let s of sections){
    if (s.offsetTop <= pos && (s.offsetTop + s.offsetHeight) > pos){
      navLinks.forEach(a => a.classList.remove('active'));
      const id = s.id;
      const el = document.querySelector(`.nav-link[href="#${id}"]`);
      if (el) el.classList.add('active');
    }
  }
}
window.addEventListener('scroll', onScroll);
onScroll();

/* ====== MOBILE MENU ====== */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

/* ====== REVEAL ON SCROLL (IntersectionObserver) ====== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // optionally unobserve for performance
      observer.unobserve(entry.target);
    }
  });
},{threshold: 0.15});

document.querySelectorAll('.reveal, .reveal-card').forEach(el => observer.observe(el));

/* ====== PROJECT MODAL PREVIEW ====== */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

/* ====== CONTACT FORM (basic) ====== */
const form = document.getElementById('contactForm');
if (form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // For demo: show success then reset. Replace with actual form handling later.
    alert('Thank you — message sent (demo). I will contact you soon!');
    form.reset();
  });
}

/* ====== SET YEAR ====== */
document.getElementById('year').textContent = new Date().getFullYear();
