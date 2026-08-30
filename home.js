const sports = {
  general: {
    image: "assets/awakening/general.webp",
    mobileImage: "assets/awakening/mobile/general.webp",
    alt: "Illustrative adult recreational athletes across multiple sports",
    line: "Your game still matters.",
    route: "app/",
    accent: "#2ee68b",
  },
  soccer: {
    image: "assets/awakening/soccer.webp",
    mobileImage: "assets/awakening/mobile/soccer.webp",
    alt: "Illustrative adult recreational soccer athlete on the field",
    line: "Another sprint.",
    route: "app/soccer/",
    accent: "#43d990",
  },
  basketball: {
    image: "assets/awakening/basketball.webp",
    mobileImage: "assets/awakening/mobile/basketball.webp",
    alt: "Illustrative adult recreational basketball athlete on the court",
    line: "Another possession.",
    route: "app/basketball/",
    accent: "#f3a33b",
  },
  pickleball: {
    image: "assets/awakening/pickleball.webp",
    mobileImage: "assets/awakening/mobile/pickleball.webp",
    alt: "Illustrative adult recreational pickleball athlete on the court",
    line: "Your feet remember.",
    route: "app/pickleball/",
    accent: "#c9ec52",
  },
  tennis: {
    image: "assets/awakening/tennis.webp",
    mobileImage: "assets/awakening/mobile/tennis.webp",
    alt: "Illustrative adult recreational tennis athlete on the court",
    line: "Another set.",
    route: "app/tennis/",
    accent: "#c8ef53",
  },
  volleyball: {
    image: "assets/awakening/volleyball.webp",
    mobileImage: "assets/awakening/mobile/volleyball.webp",
    alt: "Illustrative adult recreational volleyball athlete on the court",
    line: "Jump again.",
    route: "app/volleyball/",
    accent: "#49d8c4",
  },
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const controls = [...document.querySelectorAll("[data-sport-option]")];
const actions = [...document.querySelectorAll("[data-sport-action]")];
const athleteImage = document.querySelector("[data-sport-image]");
const athleteSource = document.querySelector("[data-sport-source]");
const athleteLine = document.querySelector("[data-sport-line]");
const stage = document.querySelector("[data-stage]");
const header = document.querySelector("[data-header]");
const preloaded = new Set();
const mobileMedia = matchMedia("(max-width: 760px)");
let transitionInFlight = false;
let scrollFrame = 0;

function publishLocalEvent(name, detail) {
  const payload = { event: name, ...detail };
  dispatchEvent(new CustomEvent("dothis:cta", { detail: payload }));
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
}

function preloadSport(id) {
  if (!Object.hasOwn(sports, id) || preloaded.has(id)) return;
  const image = new Image();
  image.src = mobileMedia.matches ? sports[id].mobileImage : sports[id].image;
  preloaded.add(id);
}

function applySport(requested, options = {}) {
  const id = Object.hasOwn(sports, requested) ? requested : "general";
  const sport = sports[id];
  const prior = document.body.dataset.sport;

  const update = () => {
    document.body.dataset.sport = id;
    document.documentElement.style.setProperty("--sport-accent", sport.accent);
    if (athleteImage) {
      athleteImage.src = sport.image;
      athleteImage.alt = sport.alt;
    }
    if (athleteSource) athleteSource.srcset = sport.mobileImage;
    if (athleteLine) athleteLine.textContent = sport.line;
    actions.forEach((action) => {
      action.href = sport.route;
      action.setAttribute("aria-label", `${action.textContent.trim()} — ${id === "general" ? "all sports" : id} App Store page`);
    });
    controls.forEach((control) => {
      const selected = control.dataset.sportOption === id;
      control.setAttribute("aria-pressed", String(selected));
      control.tabIndex = selected ? 0 : -1;
    });
  };

  if (document.startViewTransition && !reduceMotion.matches && prior && prior !== id && !transitionInFlight) {
    transitionInFlight = true;
    const transition = document.startViewTransition(update);
    transition.finished.catch(() => {}).finally(() => { transitionInFlight = false; });
  } else {
    update();
  }

  if (!reduceMotion.matches && prior !== id) {
    stage?.classList.remove("is-switching");
    requestAnimationFrame(() => stage?.classList.add("is-switching"));
  }

  if (options.updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("sport", id);
    history.pushState({ sport: id }, "", url);
  }

  if (options.track && prior !== id) publishLocalEvent("homepage_sport_select", { sport: id });
}

controls.forEach((control, index) => {
  const id = control.dataset.sportOption;
  control.addEventListener("pointerenter", () => preloadSport(id), { passive: true });
  control.addEventListener("focus", () => preloadSport(id));
  control.addEventListener("click", () => applySport(id, { updateUrl: true, track: true }));
  control.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % controls.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + controls.length) % controls.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = controls.length - 1;
    controls[next].focus({ preventScroll: true });
    applySport(controls[next].dataset.sportOption, { updateUrl: true, track: true });
  });
});

actions.forEach((action) => {
  action.addEventListener("click", () => publishLocalEvent("homepage_app_store_click", {
    sport: document.body.dataset.sport || "general",
    location: action.dataset.ctaLocation || "homepage",
  }));
});

addEventListener("popstate", () => applySport(new URLSearchParams(location.search).get("sport") || "general"));
applySport(new URLSearchParams(location.search).get("sport") || "general");

function updateHeader() {
  scrollFrame = 0;
  header?.classList.toggle("is-scrolled", scrollY > 20);
}

addEventListener("scroll", () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(updateHeader);
}, { passive: true });
updateHeader();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
