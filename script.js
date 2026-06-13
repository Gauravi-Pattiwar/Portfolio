const homeBtn = document.getElementById("home-btn");
const aboutBtn = document.getElementById("about-btn");
const skillsBtn = document.getElementById("skills-btn");
const projectsBtn = document.getElementById("projects-btn");
const contactBtn = document.getElementById("contact-btn");
const darkTheme = document.getElementById("dark-mode");

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
