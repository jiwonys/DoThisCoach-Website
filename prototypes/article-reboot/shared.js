const sports = {
  general: {
    image: "../../assets/awakening/general.webp",
    alt: "Adult recreational athletes across multiple sports",
    line: "Train for the player you still are.",
    route: "../../app/",
    accent: "#2ee68b",
  },
  soccer: {
    image: "../../assets/awakening/soccer.webp",
    alt: "Adult recreational soccer athlete on the field",
    line: "There is another sprint in you.",
    route: "../../app/soccer/",
    accent: "#43d990",
  },
  basketball: {
    image: "../../assets/awakening/basketball.webp",
    alt: "Adult recreational basketball athlete on the court",
    line: "There is another possession in you.",
    route: "../../app/basketball/",
    accent: "#f3a33b",
  },
  pickleball: {
    image: "../../assets/awakening/pickleball.webp",
    alt: "Adult recreational pickleball athlete on the court",
    line: "Your feet remember.",
    route: "../../app/pickleball/",
    accent: "#c9ec52",
  },
  tennis: {
    image: "../../assets/awakening/tennis.webp",
    alt: "Adult recreational tennis athlete on the court",
    line: "There is another set in you.",
    route: "../../app/tennis/",
    accent: "#c8ef53",
  },
  volleyball: {
    image: "../../assets/awakening/volleyball.webp",
    alt: "Adult recreational volleyball athlete on the court",
    line: "Jump again.",
    route: "../../app/volleyball/",
    accent: "#49d8c4",
  },
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const controls = [...document.querySelectorAll("[data-sport]")];
const images = [...document.querySelectorAll("[data-sport-image]")];
const lines = [...document.querySelectorAll("[data-sport-line]")];
const actions = [...document.querySelectorAll("[data-sport-action]")];
const stage = document.querySelector("[data-stage]");
let transitionInFlight = false;

function applySport(requested, options = {}) {
  const id = Object.hasOwn(sports, requested) ? requested : "general";
  const sport = sports[id];
  const prior = document.body.dataset.activeSport;

  const update = () => {
    document.body.dataset.activeSport = id;
    document.documentElement.style.setProperty("--accent", sport.accent);
    images.forEach((image) => {
      image.src = sport.image;
      image.alt = sport.alt;
    });
    lines.forEach((line) => { line.textContent = sport.line; });
    actions.forEach((action) => { action.href = sport.route; });
    controls.forEach((control) => {
      const selected = control.dataset.sport === id;
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

  if (!reduceMotion.matches) {
    stage?.classList.remove("is-switching");
    requestAnimationFrame(() => stage?.classList.add("is-switching"));
  }

  if (options.updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("sport", id);
    history.pushState({ sport: id }, "", url);
  }
}

controls.forEach((control, index) => {
  control.addEventListener("click", () => applySport(control.dataset.sport, { updateUrl: true }));
  control.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % controls.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + controls.length) % controls.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = controls.length - 1;
    controls[next].focus({ preventScroll: true });
    applySport(controls[next].dataset.sport, { updateUrl: true });
  });
});

addEventListener("popstate", () => applySport(new URLSearchParams(location.search).get("sport") || "general"));
applySport(new URLSearchParams(location.search).get("sport") || "general");
