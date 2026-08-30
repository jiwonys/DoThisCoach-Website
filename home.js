document.documentElement.classList.add("js");

const sports = {
  general: {
    label: "General",
    hero: "assets/sports/general-hero.webp",
    workout: "assets/sports/general-workout.webp",
    benefit: "Strength sessions organized around the sport and schedule you bring.",
    action: "Get DoThis",
    route: "app/",
    accent: "#39c79d",
    altHero: "DoThis multi-sport athlete App Store marketing board",
    altWorkout: "DoThis general sport-aware workout board with real simulator UI"
  },
  soccer: {
    label: "Soccer",
    hero: "assets/sports/soccer-hero.webp",
    workout: "assets/sports/soccer-workout.webp",
    benefit: "Build power without carrying dead legs into training or match day.",
    action: "Get DoThis for Soccer",
    route: "app/soccer/",
    accent: "#54d39c",
    altHero: "DoThis soccer athlete App Store marketing board",
    altWorkout: "DoThis soccer workout board with real simulator UI"
  },
  basketball: {
    label: "Basketball",
    hero: "assets/sports/basketball-hero.webp",
    workout: "assets/sports/basketball-workout.webp",
    benefit: "Build strength and durability for the work between every possession.",
    action: "Get DoThis for Basketball",
    route: "app/basketball/",
    accent: "#f4a23a",
    altHero: "DoThis basketball athlete App Store marketing board",
    altWorkout: "DoThis basketball workout board with real simulator UI"
  },
  pickleball: {
    label: "Pickleball",
    hero: "assets/sports/pickleball-hero.webp",
    workout: "assets/sports/pickleball-workout.webp",
    benefit: "Build court durability around busy play days and recovery.",
    action: "Get DoThis for Pickleball",
    route: "app/pickleball/",
    accent: "#c8ed4f",
    altHero: "DoThis pickleball athlete App Store marketing board",
    altWorkout: "DoThis pickleball workout board with real simulator UI"
  },
  tennis: {
    label: "Tennis",
    hero: "assets/sports/tennis-hero.webp",
    workout: "assets/sports/tennis-workout.webp",
    benefit: "Lift around practices and match days—not against them.",
    action: "Get DoThis for Tennis",
    route: "app/tennis/",
    accent: "#c7ef53",
    altHero: "DoThis tennis athlete App Store marketing board",
    altWorkout: "DoThis tennis workout board with real simulator UI"
  },
  volleyball: {
    label: "Volleyball",
    hero: "assets/sports/volleyball-hero.webp",
    workout: "assets/sports/volleyball-workout.webp",
    benefit: "Build strength for every jump, landing, practice, and match.",
    action: "Get DoThis for Volleyball",
    route: "app/volleyball/",
    accent: "#48d7c3",
    altHero: "DoThis volleyball athlete App Store marketing board",
    altWorkout: "DoThis volleyball workout board with real simulator UI"
  }
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const buttons = [...document.querySelectorAll("[data-sport-option]")];
const actions = [...document.querySelectorAll("[data-sport-action]")];
const heroImage = document.querySelector("[data-sport-hero]");
const workoutImage = document.querySelector("[data-sport-workout]");
const benefit = document.querySelector("[data-sport-benefit]");
const closingBenefit = document.querySelector("[data-closing-benefit]");
const label = document.querySelector("[data-sport-label]");
const visual = document.querySelector("[data-sport-visual]");

function publishLocalEvent(name, detail) {
  const payload = { event: name, ...detail };
  window.dispatchEvent(new CustomEvent("dothis:cta", { detail: payload }));
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
}

function centerSelectedSport(id = document.body.dataset.sport || "general") {
  const selectedButton = buttons.find((button) => button.dataset.sportOption === id);
  const scroller = selectedButton?.parentElement;
  if (!selectedButton || !scroller || scroller.scrollWidth <= scroller.clientWidth) return;
  scroller.scrollLeft = selectedButton.offsetLeft - ((scroller.clientWidth - selectedButton.offsetWidth) / 2);
}

function applySport(requestedId, options = {}) {
  const id = Object.hasOwn(sports, requestedId) ? requestedId : "general";
  const sport = sports[id];
  const prior = document.body.dataset.sport;

  const update = () => {
    document.documentElement.style.setProperty("--sport-accent", sport.accent);
    document.body.dataset.sport = id;
    if (label) label.textContent = sport.label;
    if (benefit) benefit.textContent = sport.benefit;
    if (closingBenefit) closingBenefit.textContent = sport.benefit;
    if (heroImage) {
      heroImage.src = sport.hero;
      heroImage.alt = sport.altHero;
    }
    if (workoutImage) {
      workoutImage.src = sport.workout;
      workoutImage.alt = sport.altWorkout;
    }
    actions.forEach((action) => {
      action.textContent = action.hasAttribute("data-compact-action") ? "Get the app" : sport.action;
      action.href = sport.route;
      if (action.hasAttribute("data-compact-action")) action.setAttribute("aria-label", sport.action);
    });
    buttons.forEach((button) => {
      const selected = button.dataset.sportOption === id;
      button.setAttribute("aria-pressed", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (visual) visual.dataset.activeSport = id;

    requestAnimationFrame(() => centerSelectedSport(id));
  };

  if (document.startViewTransition && !reduceMotion.matches && prior !== id) {
    document.startViewTransition(update);
  } else {
    update();
  }

  if (options.updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("sport", id);
    history.pushState({ sport: id }, "", url);
  }

  if (options.track && prior !== id) publishLocalEvent("homepage_sport_select", { sport: id });
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => applySport(button.dataset.sportOption, { updateUrl: true, track: true }));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = buttons.length - 1;
    const next = buttons[nextIndex];
    next.focus({ preventScroll: true });
    applySport(next.dataset.sportOption, { updateUrl: true, track: true });
  });
});

actions.forEach((action, index) => {
  action.addEventListener("click", () => {
    const locationName = action.dataset.ctaLocation || ["header", "hero", "closing"][index] || "homepage";
    publishLocalEvent("homepage_app_store_click", { sport: document.body.dataset.sport || "general", location: locationName });
  });
});

window.addEventListener("popstate", () => {
  const requested = new URLSearchParams(location.search).get("sport");
  applySport(requested || "general");
});

const requestedSport = new URLSearchParams(location.search).get("sport");
applySport(requestedSport || document.body.dataset.defaultSport || "general");

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const header = document.querySelector("[data-header]");
let scrollFrame = 0;
function updateHeader() {
  scrollFrame = 0;
  header?.classList.toggle("is-scrolled", scrollY > 16);
}
function requestHeaderUpdate() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(updateHeader);
}
updateHeader();
addEventListener("scroll", requestHeaderUpdate, { passive: true });

const menuButton = document.querySelector(".menu-button");
const navigation = document.getElementById("site-navigation");
function setMenu(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
  navigation.classList.toggle("is-open", open);
}
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
addEventListener("resize", () => {
  if (innerWidth > 1080) setMenu(false);
  centerSelectedSport();
});
