const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const header = document.querySelector(".site-header");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const revealTargets = document.querySelectorAll(
  ".hero-copy, .phone-stage, .feature-card, .article-preview-heading > *, .article-preview-grid article, .split-section > *, .showcase > *, .mini-screens > *, .results-strip > *, .pricing-tier, .contact-card, .safety, .support-hero, .support-grid article, .legal-page section",
);

revealTargets.forEach((target, index) => {
  target.classList.add("reveal");
  target.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
);

revealTargets.forEach((target) => revealObserver.observe(target));

const buttons = document.querySelectorAll(".primary-button, .secondary-button, .nav-cta");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "button-ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  });
});

const navLinks = [...document.querySelectorAll("nav a[href^='#']")];
const navSections = navLinks
  .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter((item) => item.section);

const updateActiveNav = () => {
  const scrollPoint = window.scrollY + 180;
  let active = navSections[0];

  navSections.forEach((item) => {
    if (item.section.offsetTop <= scrollPoint) active = item;
  });

  navSections.forEach((item) => item.link.classList.toggle("is-active", item === active));
};

if (navSections.length) {
  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });
}

const phone = document.querySelector(".phone");

if (phone && window.matchMedia("(pointer: fine)").matches) {
  phone.addEventListener("pointermove", (event) => {
    const rect = phone.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    phone.style.setProperty("--tilt-x", `${x * 8}deg`);
    phone.style.setProperty("--tilt-y", `${y * -8}deg`);
  });

  phone.addEventListener("pointerleave", () => {
    phone.style.setProperty("--tilt-x", "0deg");
    phone.style.setProperty("--tilt-y", "0deg");
  });
}

const taskCards = [...document.querySelectorAll(".task-card")];
let focusedTask = 0;

const cycleTaskFocus = () => {
  if (!taskCards.length) return;
  taskCards.forEach((card, index) => card.classList.toggle("is-focused", index === focusedTask));
  focusedTask = (focusedTask + 1) % taskCards.length;
};

cycleTaskFocus();
window.setInterval(cycleTaskFocus, 2400);

const featureTabs = document.querySelectorAll(".feature-tab");
const featureCards = document.querySelectorAll(".feature-card");

featureTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter || "all";

    featureTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    featureCards.forEach((card) => {
      const isMatch = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-filtered-out", !isMatch);
    });
  });
});

const workflowContent = {
  sport: {
    signal: "Volleyball match added for 7:00 PM",
    context: "High court load now overlaps with a scheduled lower-body lift.",
    decision: "Protect the match. Move heavy legs to Sunday.",
    reason: "Upper-body work stays. Carbohydrates shift toward pre-game fuel.",
    outcome: "Review what changed, why, and what happens next.",
    title: "Ready for the court without wasted fatigue.",
    items: [
      "12-minute shoulder and knee primer",
      "Lower-body lift moved to Sunday",
      "Pre-game carbohydrate target added",
    ],
  },
  schedule: {
    signal: "Tuesday's strength session was missed",
    context: "Two planned lifts remain, but stacking both tomorrow would overload the week.",
    decision: "Rebuild the week around the sessions that still matter.",
    reason: "Priority work moves forward. Lower-value volume drops instead of becoming a backlog.",
    outcome: "See the repaired schedule before accepting it.",
    title: "No guilt pile. No accidental double day.",
    items: ["Main strength session moved to Thursday", "Accessory volume reduced", "Weekly progression kept intact"],
  },
  recovery: {
    signal: "Energy is low and knee soreness is elevated",
    context: "Today's planned intensity no longer matches current readiness.",
    decision: "Lower fatigue while keeping useful movement in the day.",
    reason: "Hard jumps come out. Mobility, walking, protein, and sleep stay actionable.",
    outcome: "Choose the conservative update or keep the original plan.",
    title: "Recovery becomes part of progress, not a detour.",
    items: ["High-impact work removed", "20-minute recovery session added", "Sleep target moved to highest priority"],
  },
};

const workflowTabs = document.querySelectorAll(".workflow-tab");
const workflowFields = {
  signal: document.getElementById("workflow-signal"),
  context: document.getElementById("workflow-context"),
  decision: document.getElementById("workflow-decision"),
  reason: document.getElementById("workflow-reason"),
  outcome: document.getElementById("workflow-outcome"),
  title: document.getElementById("workflow-summary-title"),
  list: document.getElementById("workflow-summary-list"),
};

const setWorkflow = (key) => {
  const content = workflowContent[key];
  if (!content) return;

  workflowTabs.forEach((tab) => {
    const isActive = tab.dataset.workflow === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });

  Object.entries(workflowFields).forEach(([field, element]) => {
    if (!element || field === "list") return;
    element.textContent = content[field];
  });

  if (workflowFields.list) {
    workflowFields.list.replaceChildren(
      ...content.items.map((item) => {
        const row = document.createElement("li");
        row.textContent = item;
        return row;
      }),
    );
  }
};

workflowTabs.forEach((tab) => {
  tab.addEventListener("click", () => setWorkflow(tab.dataset.workflow));
});

const screenshotControls = document.querySelectorAll(".screenshot-control");
const screenshotCards = [...document.querySelectorAll(".screenshot-card")];
const screenshotGallery = document.querySelector(".screenshot-gallery");

const setScreenshot = (key) => {
  screenshotControls.forEach((control) => {
    const isActive = control.dataset.shot === key;
    control.classList.toggle("is-active", isActive);
    control.setAttribute("aria-pressed", String(isActive));
  });

  screenshotCards.forEach((card) => {
    const isActive = card.dataset.shotCard === key;
    card.classList.toggle("is-active", isActive);
    card.hidden = !isActive;
  });
};

screenshotControls.forEach((control) => {
  control.addEventListener("click", () => setScreenshot(control.dataset.shot));
});

if (screenshotGallery) {
  screenshotGallery.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = Math.max(0, screenshotCards.findIndex((card) => card.classList.contains("is-active")));
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = Math.min(screenshotCards.length - 1, Math.max(0, currentIndex + direction));
    setScreenshot(screenshotCards[nextIndex].dataset.shotCard);
  });
}

const tiltCards = document.querySelectorAll(".feature-card");

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--card-tilt-x", `${x * 4}deg`);
    card.style.setProperty("--card-tilt-y", `${y * -4}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--card-tilt-x", "0deg");
    card.style.setProperty("--card-tilt-y", "0deg");
  });
});

const counters = document.querySelectorAll("[data-count]");
const animatedCounters = new WeakSet();

const animateCounter = (counter) => {
  if (animatedCounters.has(counter)) return;
  animatedCounters.add(counter);

  const target = Number(counter.dataset.count || 0);
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = String(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  },
  { threshold: 0.45 },
);

counters.forEach((counter) => counterObserver.observe(counter));

const ambientNodes = document.querySelectorAll(".ambient");

if (ambientNodes.length && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      ambientNodes.forEach((node, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        node.style.setProperty("--ambient-x", `${x * direction}px`);
        node.style.setProperty("--ambient-y", `${y * direction}px`);
      });
    },
    { passive: true },
  );
}
