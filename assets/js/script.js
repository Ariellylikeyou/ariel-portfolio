// =========================
// SAFE DOM LOAD
// =========================
document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // SMOOTH SCROLL (Safe)
  // =========================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  // =========================
  // SCROLL SPY + NAVBAR EFFECT
  // =========================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {

      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });

      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

    });
  }


  // =========================
  // SCROLL REVEAL ANIMATION
  // =========================
  const revealSections = document.querySelectorAll(".section");

  function revealOnScroll() {
    revealSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 100) {
        section.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  // =========================
  // TYPEWRITER ANIMATION
  // =========================
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Network Analyst",
    "Security Analyst",
    "Cybersecurity Specialist",
    "System Administrator"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  const roleElement = document.getElementById("role");

  function typeRole() {
    if (!roleElement) return;

    if (charIndex < roles[roleIndex].length) {
      roleElement.textContent += roles[roleIndex][charIndex];
      charIndex++;
      setTimeout(typeRole, 100);
    } else {
      setTimeout(eraseRole, 1500);
    }
  }

  function eraseRole() {
    if (charIndex > 0) {
      roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseRole, 50);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
    }
  }

  typeRole();


  // =========================
  // EMAILJS CONTACT FORM
  // =========================
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm(
        "service_6pz8pvq",   // 🔥 Replace this
        "template_dy88p5d",  // 🔥 Replace this
        this
      )
      .then(() => {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send message. Please try again.");
        console.log("EmailJS Error:", error);
      });
    });
  }

});