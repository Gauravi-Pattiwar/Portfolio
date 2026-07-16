const homeBtn = document.getElementById("home-btn");
const aboutBtn = document.getElementById("about-btn");
const skillsBtn = document.getElementById("skills-btn");
const projectsBtn = document.getElementById("projects-btn");
const contactBtn = document.getElementById("contact-btn");
const darkTheme = document.getElementById("dark-mode");

const revealGroups = [
  { selector: ".hero-content, #description", className: "reveal-left" },
  { selector: "#profile-pic", className: "reveal-right" },
  { selector: ".about", className: "reveal-up" },
  { selector: ".education", className: "reveal-scale" },
  { selector: ".skills", className: "reveal-fade" },
  { selector: ".card", className: "reveal-scale" },
  { selector: ".projects", className: "reveal-up" },
  { selector: ".project-card", className: "reveal-zoom" },
  { selector: ".contact", className: "reveal-left" },
  { selector: ".view-project, .icon, .email", className: "reveal-right" },
  { selector: ".horizontal", className: "reveal-fade" },
];

const revealElements = [];

revealGroups.forEach((group, groupIndex) => {
  document.querySelectorAll(group.selector).forEach((element, elementIndex) => {
    element.classList.add("reveal", group.className);
    element.style.transitionDelay = `${Math.min(groupIndex * 0.06 + elementIndex * 0.08, 0.5)}s`;
    revealElements.push(element);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((element) => revealObserver.observe(element));

homeBtn.addEventListener("click", () => {
  document
    .getElementsByClassName("hero")[0]
    .scrollIntoView({ behavior: "smooth" });
});

aboutBtn.addEventListener("click", () => {
  document
    .getElementsByClassName("about")[0]
    .scrollIntoView({ behavior: "smooth" });
});

skillsBtn.addEventListener("click", () => {
  document
    .getElementsByClassName("skills")[0]
    .scrollIntoView({ behavior: "smooth" });
});

contactBtn.addEventListener("click", () => {
  document
    .getElementsByClassName("contact")[0]
    .scrollIntoView({ behavior: "smooth" });
});

projectsBtn.addEventListener("click", () => {
  document
    .getElementsByClassName("projects")[0]
    .scrollIntoView({ behavior: "smooth" });
});

darkTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
