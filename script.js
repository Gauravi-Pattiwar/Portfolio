/* ════════════════════════════════════════════════════════
   Gauravi Pattiwar · Premium Portfolio JavaScript
   ════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────
   1.  CUSTOM CURSOR
   ────────────────────────────────────────────────────── */
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

// Current & target positions
let dotX = -100, dotY = -100;
let ringX = -100, ringY = -100;
let targetX = -100, targetY = -100;
let cursorVisible = false;

function updateCursor(e) {
  targetX = e.clientX;
  targetY = e.clientY;

  // Dot follows instantly
  dotX = targetX;
  dotY = targetY;
  // Position from center: subtract half the dot size (4px)
  cursorDot.style.left = (dotX - 4) + "px";
  cursorDot.style.top = (dotY - 4) + "px";
}

window.addEventListener("mousemove", updateCursor);

// Smooth ring lerp loop
function ringLoop() {
  ringX += (targetX - ringX) * 0.13;
  ringY += (targetY - ringY) * 0.13;
  // Position from center: subtract half ring size (17px)
  cursorRing.style.left = (ringX - 17) + "px";
  cursorRing.style.top = (ringY - 17) + "px";
  requestAnimationFrame(ringLoop);
}
ringLoop();

// Show / hide on window enter-leave
document.addEventListener("mouseenter", () => {
  cursorDot.style.opacity = "1";
  cursorRing.style.opacity = "1";
});
document.addEventListener("mouseleave", () => {
  cursorDot.style.opacity = "0";
  cursorRing.style.opacity = "0";
});

// Hover state on interactive elements
const hoverables = "a, button, li, .card, .skill-card, .project-card, .skill_img, .social-chip, .contact-social-card, .edu-card, .ltag, .proj-link, #back-to-top";
document.querySelectorAll(hoverables).forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});


/* ──────────────────────────────────────────────────────
   2.  PARTICLE CANVAS
   ────────────────────────────────────────────────────── */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });

const PARTICLE_COUNT = 55;
let particles = [];

class Particle {
  constructor() { this.init(); }
  init() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.8 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.alpha = Math.random() * 0.45 + 0.08;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    const isDark = document.body.classList.contains("dark-mode");
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? `rgba(251, 113, 133, ${this.alpha * 0.9})` : `rgba(159, 18, 57, ${this.alpha * 0.85})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}
initParticles();

function drawLines() {
  const isDark = document.body.classList.contains("dark-mode");
  const strokeColor = isDark ? "251, 113, 133" : "159, 18, 57";
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${strokeColor}, ${0.1 * (1 - d / 110)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateCanvas);
}
animateCanvas();


/* ──────────────────────────────────────────────────────
   3.  TYPING EFFECT
   ────────────────────────────────────────────────────── */
const typedEl = document.getElementById("typed-text");
const phrases = [
  "Enthusiastic Learner",
  "Web Developer",
  "Problem Solver",
  "CS Student @ PICT",
  "Future Engineer",
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const cur = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = cur.slice(0, --charIdx);
    if (charIdx <= 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 480);
      return;
    }
    setTimeout(typeLoop, 45);
  } else {
    typedEl.textContent = cur.slice(0, ++charIdx);
    if (charIdx >= cur.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 80);
  }
}
// Start after hero animations settle
setTimeout(typeLoop, 1500);


/* ──────────────────────────────────────────────────────
   4.  SCROLL PROGRESS BAR
   ────────────────────────────────────────────────────── */
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrolled / maxScroll) * 100) + "%";
});


/* ──────────────────────────────────────────────────────
   5.  NAVBAR SCROLL EFFECTS + ACTIVE LINK
   ────────────────────────────────────────────────────── */
const navbar = document.querySelector(".nav_bar");
const sections = document.querySelectorAll("section[id]");
const navLinks = {
  "hero-section": "home-btn",
  "about-section": "about-btn",
  "skill-section": "skills-btn",
  "projects-section": "projects-btn",
  "contact-section": "contact-btn",
};

window.addEventListener("scroll", () => {
  // Scrolled shadow
  navbar.classList.toggle("scrolled", window.scrollY > 30);

  // Active nav highlight
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  Object.values(navLinks).forEach(id => document.getElementById(id)?.classList.remove("active"));
  if (navLinks[current]) document.getElementById(navLinks[current])?.classList.add("active");

  // Back-to-top
  btt.classList.toggle("visible", window.scrollY > 400);
});


/* ──────────────────────────────────────────────────────
   6.  SMOOTH NAV SCROLL
   ────────────────────────────────────────────────────── */
const scrollTargets = {
  "home-btn": "#hero-section",
  "about-btn": "#about-section",
  "skills-btn": "#skill-section",
  "projects-btn": "#projects-section",
  "contact-btn": "#contact-section",
};

Object.entries(scrollTargets).forEach(([id, selector]) => {
  document.getElementById(id)?.addEventListener("click", () => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    // Close mobile menu after clicking a link
    navLinksEl.classList.remove("open");
    hamburgerBtn.classList.remove("active");
  });
});

// "View My Work" button
document.getElementById("view-work-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#projects-section")?.scrollIntoView({ behavior: "smooth" });
});


/* ──────────────────────────────────────────────────────
   6b. MOBILE HAMBURGER MENU
   ────────────────────────────────────────────────────── */
const hamburgerBtn = document.getElementById("hamburger");
const navLinksEl = document.querySelector(".nav-links");

hamburgerBtn?.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navLinksEl.classList.toggle("open");
});


/* ──────────────────────────────────────────────────────
   7.  SCROLL-REVEAL (IntersectionObserver)
   ────────────────────────────────────────────────────── */
// Stagger child delays
function staggerReveal(parentSelector, childSelector, delayStep = 0.1) {
  document.querySelectorAll(parentSelector).forEach(parent => {
    parent.querySelectorAll(childSelector).forEach((child, i) => {
      child.style.transitionDelay = `${i * delayStep}s`;
    });
  });
}

staggerReveal(".skills-grid", ".skill-card", 0.12);
staggerReveal(".projects-grid", ".project-card", 0.14);
staggerReveal(".about-right", ".edu-card", 0.1);
staggerReveal(".stats-strip", ".stat-item", 0.08);
staggerReveal(".hero-content", ".reveal-hero", 0.12);
staggerReveal(".hero-visual", ".reveal-hero", 0.12);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      // Only un-reveal for re-animations (skip hero elements)
      if (!entry.target.classList.contains("no-re-reveal")) {
        entry.target.classList.remove("visible");
      }
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// Reveal all .reveal elements
document.querySelectorAll(".reveal, .reveal-hero").forEach(el => {
  revealObserver.observe(el);
});

// Section title underline
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("line-visible");
    else e.target.classList.remove("line-visible");
  });
}, { threshold: 0.5 });

document.querySelectorAll(".section-title").forEach(t => titleObserver.observe(t));


/* ──────────────────────────────────────────────────────
   8.  COUNTER ANIMATION
   ────────────────────────────────────────────────────── */
function animateCount(el, target, duration = 1200) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".stat-num").forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCount(el, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stats-strip").forEach(el => counterObserver.observe(el));


/* ──────────────────────────────────────────────────────
   9.  DARK MODE TOGGLE
   ────────────────────────────────────────────────────── */
const darkBtn = document.getElementById("dark-mode");
const darkIcon = darkBtn?.querySelector("i");

darkBtn?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  if (darkIcon) {
    darkIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Restore preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  if (darkIcon) darkIcon.className = "fa-solid fa-sun";
}


/* ──────────────────────────────────────────────────────
   10. BACK TO TOP
   ────────────────────────────────────────────────────── */
const btt = document.getElementById("back-to-top");
btt?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ──────────────────────────────────────────────────────
   11. 3-D TILT on Project Cards
   ────────────────────────────────────────────────────── */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `rotateX(${-dy * 5}deg) rotateY(${dx * 7}deg) translateY(-8px) scale(1.01)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.5s ease";
    setTimeout(() => card.style.transition = "", 500);
  });
  card.addEventListener("mouseenter", () => {
    card.style.transition = "box-shadow 0.35s ease, transform 0.1s ease";
  });
});


/* ──────────────────────────────────────────────────────
   12. SKILL CARD GLOW on Hover
   ────────────────────────────────────────────────────── */
document.querySelectorAll(".skill-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--grad-soft), var(--card-bg) 70%)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });
});


/* ──────────────────────────────────────────────────────
   13. HERO — subtle parallax on scroll
   ────────────────────────────────────────────────────── */
const heroVisual = document.querySelector(".hero-visual");
window.addEventListener("scroll", () => {
  const sy = window.scrollY;
  if (sy < window.innerHeight && heroVisual) {
    heroVisual.style.transform = `translateY(${sy * 0.06}px)`;
  }
});


/* ──────────────────────────────────────────────────────
   14. NAVBAR hover cursor expand (already handled by hover selector)
      Extra: Add ripple on nav links click
   ────────────────────────────────────────────────────── */
document.querySelectorAll(".nav-links li").forEach(li => {
  li.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background: rgba(159, 18, 57, 0.18);
      transform: scale(0); animation: rippleEffect 0.5s ease-out forwards;
      pointer-events:none;
    `;
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const style = document.createElement("style");
style.textContent = `
  @keyframes rippleEffect {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(style);


/* ──────────────────────────────────────────────────────
   15. MAGNETIC effect on buttons
   ────────────────────────────────────────────────────── */
function magnetic(el, strength = 0.35) {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
    el.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    setTimeout(() => el.style.transition = "", 400);
  });
}

document.querySelectorAll(".social-chip, .contact-social-card, #back-to-top").forEach(el => magnetic(el, 0.3));


/* ──────────────────────────────────────────────────────
   16. PAGE LOAD — trigger hero reveals after slight delay
   ────────────────────────────────────────────────────── */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".reveal-hero").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 120);
    });
  }, 200);
});


/* ──────────────────────────────────────────────────────
   17. INTERACTIVE STICKY NOTE / SCRATCHPAD WIDGET
   ────────────────────────────────────────────────────── */
const stickyWidget = document.getElementById("sticky-note-widget");
const stickyToggleBtn = document.getElementById("sticky-toggle-btn");
const stickyCloseBtn = document.getElementById("sticky-close-btn");
const stickyCard = document.getElementById("sticky-note-card");
const stickyInput = document.getElementById("sticky-note-input");
const stickyCopyBtn = document.getElementById("sticky-copy-btn");
const stickyClearBtn = document.getElementById("sticky-clear-btn");
const stickySendBtn = document.getElementById("sticky-send-btn");
const stickyStatus = document.getElementById("sticky-status-msg");
const stickyCharCount = document.getElementById("sticky-char-count");
const stickyBadge = document.getElementById("sticky-toggle-badge");
const stickyCallout = document.getElementById("sticky-callout");
const calloutCloseBtn = document.getElementById("callout-close-btn");
const swatchBtns = document.querySelectorAll(".swatch-btn");
const promptChips = document.querySelectorAll(".prompt-chip");

const STICKY_STORAGE_KEY = "portfolio_sticky_note";
const STICKY_COLOR_KEY = "portfolio_sticky_color";
const STICKY_CALLOUT_KEY = "portfolio_callout_dismissed";

// Load saved note & color on init
function loadStickyNote() {
  const savedNote = localStorage.getItem(STICKY_STORAGE_KEY);
  if (savedNote && stickyInput) {
    stickyInput.value = savedNote;
    updateCharCount(savedNote.length);
    updateBadge(savedNote.trim().length > 0);
  }

  // Restore color theme
  const savedColor = localStorage.getItem(STICKY_COLOR_KEY) || "yellow";
  applyNoteColor(savedColor);

  // Callout dismissed state check
  if (localStorage.getItem(STICKY_CALLOUT_KEY) === "true") {
    if (stickyCallout) {
      stickyCallout.classList.add("hidden");
      stickyCallout.style.display = "none";
    }
  }
}

function updateCharCount(len) {
  if (stickyCharCount) {
    stickyCharCount.textContent = `${len} char${len === 1 ? "" : "s"}`;
  }
}

function updateBadge(hasContent) {
  if (stickyBadge) {
    stickyBadge.classList.toggle("active", hasContent);
  }
}

function dismissCallout() {
  if (stickyCallout) {
    stickyCallout.classList.add("hidden");
    stickyCallout.style.display = "none";
  }
  localStorage.setItem(STICKY_CALLOUT_KEY, "true");
}

// Callout click handlers
calloutCloseBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dismissCallout();
});

stickyCallout?.addEventListener("click", (e) => {
  if (e.target.closest("#callout-close-btn") || e.target === calloutCloseBtn) {
    e.preventDefault();
    e.stopPropagation();
    dismissCallout();
    return;
  }
  dismissCallout();
  stickyWidget?.classList.add("open");
  stickyInput?.focus();
});

function showStickyStatus(text, isSuccess = false) {
  if (!stickyStatus) return;
  stickyStatus.textContent = text;
  stickyStatus.classList.toggle("success", isSuccess);
  setTimeout(() => {
    if (stickyStatus) {
      stickyStatus.textContent = "Auto-saved ✓";
      stickyStatus.classList.remove("success");
    }
  }, 2200);
}

function applyNoteColor(colorName) {
  if (!stickyCard) return;
  stickyCard.className = `sticky-note-card note-${colorName}`;
  swatchBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.color === colorName);
  });
  localStorage.setItem(STICKY_COLOR_KEY, colorName);
}

// Swatch click handlers
swatchBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    applyNoteColor(btn.dataset.color);
  });
});

// Prompt chips click handlers
promptChips.forEach(chip => {
  chip.addEventListener("click", () => {
    const promptText = chip.dataset.prompt;
    if (!stickyInput) return;
    if (stickyInput.value.trim().length > 0) {
      stickyInput.value += `\n${promptText}`;
    } else {
      stickyInput.value = promptText;
    }
    updateCharCount(stickyInput.value.length);
    localStorage.setItem(STICKY_STORAGE_KEY, stickyInput.value);
    updateBadge(true);
    showStickyStatus("Prompt added! ✓", true);
    stickyInput.focus();
  });
});

// Toggle open / close
stickyToggleBtn?.addEventListener("click", () => {
  dismissCallout();
  stickyWidget?.classList.add("open");
  stickyInput?.focus();
});

stickyToggleBtn?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    dismissCallout();
    stickyWidget?.classList.add("open");
    stickyInput?.focus();
  }
});

stickyCloseBtn?.addEventListener("click", () => {
  stickyWidget?.classList.remove("open");
});

// Auto-save on input
let stickySaveTimer;
stickyInput?.addEventListener("input", (e) => {
  const val = e.target.value;
  updateCharCount(val.length);
  updateBadge(val.trim().length > 0);

  if (stickyStatus) {
    stickyStatus.textContent = "Saving...";
    stickyStatus.classList.remove("success");
  }

  clearTimeout(stickySaveTimer);
  stickySaveTimer = setTimeout(() => {
    localStorage.setItem(STICKY_STORAGE_KEY, val);
    if (stickyStatus) {
      stickyStatus.textContent = "Auto-saved ✓";
    }
  }, 350);
});

// Copy note to clipboard
stickyCopyBtn?.addEventListener("click", async () => {
  if (!stickyInput || !stickyInput.value.trim()) {
    showStickyStatus("Note is empty", false);
    return;
  }
  try {
    await navigator.clipboard.writeText(stickyInput.value);
    const originalHTML = stickyCopyBtn.innerHTML;
    stickyCopyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    showStickyStatus("Copied to clipboard! ✓", true);
    setTimeout(() => {
      stickyCopyBtn.innerHTML = originalHTML;
    }, 1800);
  } catch (err) {
    showStickyStatus("Copy failed", false);
  }
});

// Send note directly via email
stickySendBtn?.addEventListener("click", () => {
  if (!stickyInput || !stickyInput.value.trim()) {
    showStickyStatus("Type a note first!", false);
    return;
  }
  const bodyText = encodeURIComponent(stickyInput.value);
  const mailtoUrl = `mailto:gauravipattiwar04@gmail.com?subject=Note%20from%20Portfolio&body=${bodyText}`;
  window.open(mailtoUrl, "_blank");
  showStickyStatus("Opening mail client... 🚀", true);
});

// Clear note
stickyClearBtn?.addEventListener("click", () => {
  if (!stickyInput || !stickyInput.value.trim()) return;
  stickyInput.value = "";
  localStorage.removeItem(STICKY_STORAGE_KEY);
  updateCharCount(0);
  updateBadge(false);
  showStickyStatus("Cleared", false);
  stickyInput.focus();
});

// Initialize sticky note state
loadStickyNote();
