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
  ".hero-copy, .phone-stage, .feature-card, .article-preview-heading > *, .article-preview-grid article, .split-section > *, .showcase > *, .mini-screens > *, .results-strip > *, .pricing-card, .contact-card, .safety, .support-hero, .support-grid article, .legal-page section",
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

    featureTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    featureCards.forEach((card) => {
      const isMatch = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-filtered-out", !isMatch);
    });
  });
});

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
