const sports = {
  general: {
    image: "assets/awakening/general.webp",
    alt: "Adult recreational athletes ready to train across multiple sports",
    whisper: "The athlete is still there.",
    route: "app/",
    accent: "#24d3a2"
  },
  soccer: {
    image: "assets/awakening/soccer.webp",
    alt: "Adult recreational soccer athlete standing on the field",
    whisper: "There is another sprint in you.",
    route: "app/soccer/",
    accent: "#43d990"
  },
  basketball: {
    image: "assets/awakening/basketball.webp",
    alt: "Adult recreational basketball athlete standing on the court",
    whisper: "There is another possession in you.",
    route: "app/basketball/",
    accent: "#f3a33b"
  },
  pickleball: {
    image: "assets/awakening/pickleball.webp",
    alt: "Adult recreational pickleball athlete standing on the court",
    whisper: "Your feet remember.",
    route: "app/pickleball/",
    accent: "#c9ec52"
  },
  tennis: {
    image: "assets/awakening/tennis.webp",
    alt: "Adult recreational tennis athlete standing on the court",
    whisper: "There is another set in you.",
    route: "app/tennis/",
    accent: "#c8ef53"
  },
  volleyball: {
    image: "assets/awakening/volleyball.webp",
    alt: "Adult recreational volleyball athlete standing on the court",
    whisper: "Jump again.",
    route: "app/volleyball/",
    accent: "#49d8c4"
  }
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const buttons = [...document.querySelectorAll("[data-sport-option]")];
const actions = [...document.querySelectorAll("[data-sport-action]")];
const sportImage = document.querySelector("[data-sport-image]");
const whisper = document.querySelector("[data-sport-whisper]");
let transitionInFlight = false;

function publishLocalEvent(name, detail) {
  const payload = { event: name, ...detail };
  dispatchEvent(new CustomEvent("dothis:cta", { detail: payload }));
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
}

function centerSelected(id = document.body.dataset.sport || "general") {
  const button = buttons.find((item) => item.dataset.sportOption === id);
  const row = button?.parentElement;
  if (!button || !row || row.scrollWidth <= row.clientWidth) return;
  row.scrollLeft = button.offsetLeft - ((row.clientWidth - button.offsetWidth) / 2);
}

function applySport(requested, options = {}) {
  const id = Object.hasOwn(sports, requested) ? requested : "general";
  const sport = sports[id];
  const prior = document.body.dataset.sport;

  const update = () => {
    document.body.dataset.sport = id;
    document.documentElement.style.setProperty("--sport-accent", sport.accent);
    if (sportImage) {
      sportImage.src = sport.image;
      sportImage.alt = sport.alt;
    }
    if (whisper) whisper.textContent = sport.whisper;
    actions.forEach((action) => {
      action.href = sport.route;
      action.setAttribute("aria-label", `${action.textContent.trim()} — ${id === "general" ? "all sports" : id}`);
    });
    buttons.forEach((button) => {
      const active = button.dataset.sportOption === id;
      button.setAttribute("aria-pressed", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    requestAnimationFrame(() => centerSelected(id));
  };

  if (document.startViewTransition && !reduceMotion.matches && prior !== id && !transitionInFlight) {
    transitionInFlight = true;
    const transition = document.startViewTransition(update);
    transition.finished.catch(() => {}).finally(() => { transitionInFlight = false; });
  } else update();

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
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
    if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = buttons.length - 1;
    buttons[next].focus({ preventScroll: true });
    applySport(buttons[next].dataset.sportOption, { updateUrl: true, track: true });
  });
});

actions.forEach((action) => {
  action.addEventListener("click", () => publishLocalEvent("homepage_app_store_click", {
    sport: document.body.dataset.sport || "general",
    location: action.dataset.ctaLocation || "homepage"
  }));
});

addEventListener("popstate", () => applySport(new URLSearchParams(location.search).get("sport") || "general"));
applySport(new URLSearchParams(location.search).get("sport") || "general");

const header = document.querySelector("[data-header]");
let scrollFrame = 0;
function updateHeader() {
  scrollFrame = 0;
  header?.classList.toggle("is-scrolled", scrollY > 24);
}
addEventListener("scroll", () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(updateHeader);
}, { passive: true });
addEventListener("resize", () => centerSelected());
updateHeader();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
