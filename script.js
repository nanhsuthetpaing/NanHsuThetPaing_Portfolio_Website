const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") document.documentElement.classList.add("light");

if (storedTheme === "light") {
  document.documentElement.classList.add("light");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
} else {
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  const isLight = document.documentElement.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  if (isLight) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

const typedEl = document.getElementById("typed");
const phrases = [
  "Frontend Developer",
  "Website Developer",
  "Aspiring Full-Stack Developer",
];
let pIndex = 0,
  chIndex = 0,
  forward = true;

function typeLoop() {
  const current = phrases[pIndex];
  if (forward) {
    chIndex++;
    if (chIndex > current.length) {
      forward = false;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    chIndex--;
    if (chIndex < 0) {
      forward = true;
      pIndex = (pIndex + 1) % phrases.length;
      setTimeout(typeLoop, 200);
      return;
    }
  }
  typedEl.textContent = current.slice(0, chIndex);
  setTimeout(typeLoop, forward ? 60 : 40);
}
typeLoop();

const navLinks = document.querySelectorAll(".nav-link");
const sections = [...document.querySelectorAll("main section")];
function onScroll() {
  const pos = window.scrollY + window.innerHeight / 3;
  for (let s of sections) {
    if (s.offsetTop <= pos && s.offsetTop + s.offsetHeight > pos) {
      navLinks.forEach((a) => a.classList.remove("active"));
      const id = s.id;
      const el = document.querySelector(`.nav-link[href="#${id}"]`);
      if (el) el.classList.add("active");
    }
  }
}
window.addEventListener("scroll", onScroll);
onScroll();

const hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(".reveal, .reveal-card")
  .forEach((el) => observer.observe(el));

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const sendButton = form.querySelector("button[type='submit']");
    if (sendButton) {
      sendButton.disabled = true;
      sendButton.textContent = "Sending...";
    }
    status.textContent = "Sending message...";
    status.style.color = "#9aa6b2";

    const serviceID = "service_mv8mcv5";
    const templateID = "template_5kxbea9";
    const publicKey = "zosB23hFxhEFy9kZw";

    try {
      await emailjs.sendForm(serviceID, templateID, form, publicKey);
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "#00c853";
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      status.textContent =
        "❌ Failed to send. Please check your EmailJS keys or internet.";
      status.style.color = "#ff1744";
    } finally {
      if (sendButton) {
        sendButton.disabled = false;
        sendButton.textContent = "Send Message";
      }
    }
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
