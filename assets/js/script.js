// Central config — replace with your own EmailJS values
const EMAILJS_CONFIG = {
  publicKey: "owa19qji0CTGnG5_M",
  serviceId: "service_6pz8pvq",
  templateId: "template_dy88p5d"
};

document.addEventListener("DOMContentLoaded", function () {
  if (window.emailjs && EMAILJS_CONFIG.publicKey) {
    try { emailjs.init(EMAILJS_CONFIG.publicKey); } catch (e) { console.warn("EmailJS init failed", e); }
  }

  // ---------- Mobile nav ----------
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // ---------- Smooth scroll (native fallback safe) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ---------- Scroll spy + navbar + to-top ----------
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navbar = document.querySelector(".navbar");
  const toTop = document.getElementById("to-top");

  function onScroll() {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 160) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    if (toTop) toTop.hidden = window.scrollY < 600;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(".section");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("show");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("show"));
  }

  // ---------- Typewriter ----------
  const roles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI Integration",
    "System Administrator"
  ];
  const roleElement = document.getElementById("role");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (roleElement) {
    if (reduceMotion) {
      roleElement.textContent = roles[0];
    } else {
      let roleIndex = 0, charIndex = 0, deleting = false;
      (function tick() {
        const word = roles[roleIndex];
        roleElement.textContent = word.substring(0, charIndex);
        if (!deleting && charIndex < word.length) {
          charIndex++;
          setTimeout(tick, 85);
        } else if (!deleting) {
          deleting = true;
          setTimeout(tick, 1400);
        } else if (charIndex > 0) {
          charIndex--;
          setTimeout(tick, 40);
        } else {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 400);
        }
      })();
    }
  }

  // ---------- Contact form ----------
  const contactForm = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("contact-submit");

  function setStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (type ? " " + type : "");
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      if (!window.emailjs) {
        setStatus("Email service unavailable. Please try again later.", "error");
        return;
      }
      const label = submitBtn ? submitBtn.querySelector(".btn-label") : null;
      if (submitBtn) submitBtn.disabled = true;
      if (label) label.textContent = "Sending…";
      setStatus("", "");

      emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, contactForm)
        .then(() => {
          setStatus("Message sent successfully. I'll reply soon.", "success");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          setStatus("Failed to send. Please email me directly or try again.", "error");
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
          if (label) label.textContent = "Send Message";
        });
    });
  }

  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
