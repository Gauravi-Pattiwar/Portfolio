const homeBtn = document.getElementById("home-btn");
const aboutBtn = document.getElementById("about-btn");
const skillsBtn = document.getElementById("skills-btn");
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

darkTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Reveal-on-scroll with staggered transitions
(function () {
  const all = Array.from(document.querySelectorAll("body *"))
    .filter((el) => el instanceof HTMLElement)
    .filter(
      (el) =>
        !["SCRIPT", "STYLE", "LINK", "META", "HEAD", "TITLE"].includes(
          el.tagName,
        ),
    );

  all.forEach((el, i) => {
    el.classList.add("reveal");
    el.dataset.revealIndex = i;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          const delay = (parseInt(el.dataset.revealIndex, 10) || 0) * 60;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("show");
          // Optionally unobserve if you want the reveal to happen only once
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12 },
  );

  all.forEach((el) => io.observe(el));
})();
