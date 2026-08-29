document.documentElement.classList.add("js");

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector("[data-header]");
const hero = document.querySelector(".hero");
let scrollFrame = 0;

const updateScrollEffects = () => {
  scrollFrame = 0;
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
  if (!hero || reduceMotion.matches || window.innerWidth <= 620) return;
  const shift = Math.min(28, window.scrollY * 0.035);
  hero.style.setProperty("--hero-shift", `${shift}px`);
};

const requestScrollUpdate = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updateScrollEffects);
};

updateScrollEffects();
window.addEventListener("scroll", requestScrollUpdate, { passive: true });

const menuButton = document.querySelector(".menu-button");
const navigation = document.getElementById("site-navigation");

const setMenu = (open) => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
  navigation.classList.toggle("is-open", open);
};

menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("click", (event) => {
  if (!header?.contains(event.target)) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || menuButton?.getAttribute("aria-expanded") !== "true") return;
  setMenu(false);
  menuButton.focus();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) setMenu(false);
  requestScrollUpdate();
});

const revealTargets = document.querySelectorAll(".reveal");
if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
  );
  revealTargets.forEach((target) => revealObserver.observe(target));
}

const engine = document.querySelector("[data-engine]");
const engineStage = document.querySelector("[data-engine-stage]");
const engineControls = Array.from(document.querySelectorAll("[data-engine-control]"));
const engineSteps = Array.from(document.querySelectorAll("[data-engine-step]"));
const engineViews = Array.from(document.querySelectorAll("[data-engine-view]"));
const engineProgress = Array.from(document.querySelectorAll(".engine-progress span"));
const engineLabel = document.querySelector("[data-engine-label]");
const engineStates = ["week", "choice", "session"];
const engineLabels = {
  week: "01 · SET THE WEEK",
  choice: "02 · CHOOSE THE LOAD",
  session: "03 · GET THE SESSION",
};
let activeEngineState = "week";

const selectEngineState = (state, options = {}) => {
  if (!engineStates.includes(state) || !engineStage) return;
  activeEngineState = state;
  const activeIndex = engineStates.indexOf(state);
  engineStage.dataset.state = state;
  if (engineLabel) engineLabel.textContent = engineLabels[state];

  engineControls.forEach((control, index) => {
    const active = control.dataset.engineControl === state;
    control.setAttribute("aria-selected", String(active));
    control.tabIndex = active ? 0 : -1;
    engineProgress[index]?.classList.toggle("is-active", index === activeIndex);
  });
  engineSteps.forEach((step) => step.classList.toggle("is-active", step.dataset.engineStep === state));
  engineViews.forEach((view) => view.setAttribute("aria-hidden", String(view.dataset.engineView !== state)));

  if (options.scrollCopy) {
    const target = window.innerWidth > 900 ? document.querySelector(`[data-engine-step="${state}"]`) : engineStage;
    target?.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: window.innerWidth > 900 ? "center" : "start" });
  }
};

engineControls.forEach((control, index) => {
  control.addEventListener("click", () => selectEngineState(control.dataset.engineControl, { scrollCopy: true }));
  control.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) nextIndex = (index - 1 + engineControls.length) % engineControls.length;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) nextIndex = (index + 1) % engineControls.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = engineControls.length - 1;
    const next = engineControls[nextIndex];
    selectEngineState(next.dataset.engineControl, { scrollCopy: window.innerWidth > 900 });
    next.focus({ preventScroll: true });
  });
});

if (engine && "IntersectionObserver" in window) {
  const engineObserver = new IntersectionObserver(
    (entries) => {
      if (window.innerWidth <= 900) return;
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.dataset.engineStep) selectEngineState(visible.target.dataset.engineStep);
    },
    { threshold: [0.35, 0.55, 0.75], rootMargin: "-18% 0px -24% 0px" },
  );
  engineSteps.forEach((step) => engineObserver.observe(step));
}

selectEngineState(activeEngineState);

const productData = {
  today: {
    index: "01 / TODAY",
    title: "One daily plan from the week you confirmed.",
    description: "Today coordinates training, sport, nutrition, recovery, and useful follow-through without pretending every day is perfect.",
    points: ["3–5 clear tasks", "Minimum versions for hard days", "Completed items stay completed"],
    image: "assets/screenshots/today-plan.webp",
    alt: "DoThis Today screen showing a day strategy and coordinated daily goals",
  },
  workout: {
    index: "02 / WORKOUT",
    title: "Generation grounded in what you actually did.",
    description: "Completed sets, recent sessions, available equipment, pain context, and Athlete Week guide the generated session and its explanation.",
    points: ["Exact set targets and load units", "Schedule-fit label and explanation", "Current workout preserved on failure"],
    image: "assets/screenshots/adaptive-workout.webp",
    alt: "DoThis Workout screen showing a generated strength session",
  },
  coach: {
    index: "03 / COACH",
    title: "Advice with visible, editable memory.",
    description: "Coach can explain and suggest while typed memory stays inspectable. Execution still happens only on the destination screen you confirm.",
    points: ["Review, edit, and delete memory", "Temporary context can expire", "No silent state changes from chat"],
    image: "assets/screenshots/coach-memory.webp",
    alt: "DoThis Coach Memory screen with review, edit, and delete controls",
  },
  progress: {
    index: "04 / PROGRESS",
    title: "Progress built from completed evidence.",
    description: "Weekly summaries use completed workouts, logged sets, earned progression, and the sport or cardio days you planned.",
    points: ["Completed-workout evidence", "Last working weights", "Sport and cardio context"],
    image: "assets/screenshots/progress-trends.webp",
    alt: "DoThis Progress screen showing training trends and completed evidence",
  },
  food: {
    index: "05 / FOOD",
    title: "Log food without turning dinner into homework.",
    description: "Add food by search, barcode, manual entry, or AI estimate. Calories and macros stay together in the same daily record.",
    points: ["Search and barcode options", "Manual entry when needed", "AI estimate remains reviewable"],
    image: "assets/screenshots/ai-nutrition.webp",
    alt: "DoThis food logging screen showing nutrition and macro information",
  },
};

const productTabs = Array.from(document.querySelectorAll("[data-product]"));
const productPanel = document.getElementById("product-panel");
const productIndex = document.getElementById("product-index");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");
const productPoints = document.getElementById("product-points");
const productImage = document.getElementById("product-image");
const phoneFrame = document.querySelector(".phone-frame");
let productTimer = 0;

const selectProduct = (tab) => {
  const product = productData[tab?.dataset.product];
  if (!product || !productPanel || !productImage) return;
  window.clearTimeout(productTimer);

  productTabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  productPanel.setAttribute("aria-labelledby", tab.id);
  phoneFrame?.classList.add("is-changing");

  productTimer = window.setTimeout(() => {
    productIndex.textContent = product.index;
    productTitle.textContent = product.title;
    productDescription.textContent = product.description;
    productPoints.replaceChildren(...product.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    }));
    productImage.src = product.image;
    productImage.alt = product.alt;
    const finish = () => phoneFrame?.classList.remove("is-changing");
    if (productImage.complete) finish();
    else productImage.addEventListener("load", finish, { once: true });
  }, reduceMotion.matches ? 0 : 140);
};

productTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectProduct(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + productTabs.length) % productTabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % productTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = productTabs.length - 1;
    const next = productTabs[nextIndex];
    selectProduct(next);
    next.focus();
  });
});
