const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("visible");
    }
  });
};

const runCounter = (counter) => {
  const target = Number(counter.dataset.target);
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 40));

  const updateCounter = () => {
    current += increment;

    if (current >= target) {
      counter.textContent = target;
      return;
    }

    counter.textContent = current;
    requestAnimationFrame(updateCounter);
  };

  updateCounter();
};

let countersStarted = false;

const startCountersIfVisible = () => {
  const statsSection = document.querySelector(".stats");
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100 && !countersStarted) {
    counters.forEach((counter) => runCounter(counter));
    countersStarted = true;
  }
};

window.addEventListener("scroll", () => {
  revealOnScroll();
  startCountersIfVisible();
});

window.addEventListener("load", () => {
  revealOnScroll();
  startCountersIfVisible();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const modalidad = document.getElementById("modalidad").value;

  if (!nombre || !email || !modalidad) {
    formMessage.textContent = "Completa todos los campos para continuar.";
    return;
  }

  formMessage.textContent = `Gracias, ${nombre}. Tu solicitud como ${modalidad} fue registrada.`;
  form.reset();
});