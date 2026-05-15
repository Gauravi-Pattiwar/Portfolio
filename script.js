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
