const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

const interiorTrack = document.getElementById("interior-track");

document.querySelectorAll(".interior-scroll-button").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.scroll === "next" ? 1 : -1;
    interiorTrack.scrollBy({
      left: direction * interiorTrack.clientWidth * 0.8,
      behavior: "smooth",
    });
  });
});

const inquiryForm = document.getElementById("inquiry-form");

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(inquiryForm);
  const message = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Phone: ${formData.get("phone") || "Not provided"}`,
    `Project type: ${formData.get("project")}`,
    "",
    "Project details:",
    formData.get("details") || "Not provided",
  ].join("\n");
  const subject = `Zee Con project inquiry - ${formData.get("project")}`;
  const mailto = `mailto:zeecon@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  window.location.href = mailto;
});

document.getElementById("year").textContent = new Date().getFullYear();

const siteHeader = document.querySelector(".site-header");
const updateHeader = () => {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealTargets = document.querySelectorAll(
  ".section-heading, .process-card, .process-lower, .finance-copy, .finance-sample, " +
  ".options > h2, .option-card, .interior-heading, .interior-card, " +
  ".gallery-copy, .gallery-mosaic, .inquiry-copy, .inquiry-form, .footer-intro, " +
  ".footer-description, .footer-column, .footer-bottom",
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealTargets.forEach((target, index) => {
    target.classList.add("scroll-reveal");
    target.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
    revealObserver.observe(target);
  });
}
