const sports = {
  general: {
    label: "General",
    hero: "/assets/sports/general-hero.webp",
    workout: "/assets/sports/general-workout.webp",
    benefit: "Strength sessions organized around the sport and schedule you bring.",
    action: "Get DoThis",
    route: "/app/",
    accent: "#39c79d",
    altHero: "DoThis multi-sport athlete App Store marketing board",
    altWorkout: "DoThis general sport-aware workout board with real simulator UI"
  },
  soccer: {
    label: "Soccer",
    hero: "/assets/sports/soccer-hero.webp",
    workout: "/assets/sports/soccer-workout.webp",
    benefit: "Build power without carrying dead legs into training or match day.",
    action: "Get DoThis for Soccer",
    route: "/app/soccer/",
    accent: "#54d39c",
    altHero: "DoThis soccer athlete App Store marketing board",
    altWorkout: "DoThis soccer workout board with real simulator UI"
  },
  basketball: {
    label: "Basketball",
    hero: "/assets/sports/basketball-hero.webp",
    workout: "/assets/sports/basketball-workout.webp",
    benefit: "Build strength and durability for the work between every possession.",
    action: "Get DoThis for Basketball",
    route: "/app/basketball/",
    accent: "#f4a23a",
    altHero: "DoThis basketball athlete App Store marketing board",
    altWorkout: "DoThis basketball workout board with real simulator UI"
  },
  pickleball: {
    label: "Pickleball",
    hero: "/assets/sports/pickleball-hero.webp",
    workout: "/assets/sports/pickleball-workout.webp",
    benefit: "Build court durability around busy play days and recovery.",
    action: "Get DoThis for Pickleball",
    route: "/app/pickleball/",
    accent: "#c8ed4f",
    altHero: "DoThis pickleball athlete App Store marketing board",
    altWorkout: "DoThis pickleball workout board with real simulator UI"
  },
  tennis: {
    label: "Tennis",
    hero: "/assets/sports/tennis-hero.webp",
    workout: "/assets/sports/tennis-workout.webp",
    benefit: "Lift around practices and match days—not against them.",
    action: "Get DoThis for Tennis",
    route: "/app/tennis/",
    accent: "#c7ef53",
    altHero: "DoThis tennis athlete App Store marketing board",
    altWorkout: "DoThis tennis workout board with real simulator UI"
  },
  volleyball: {
    label: "Volleyball",
    hero: "/assets/sports/volleyball-hero.webp",
    workout: "/assets/sports/volleyball-workout.webp",
    benefit: "Build strength for every jump, landing, practice, and match.",
    action: "Get DoThis for Volleyball",
    route: "/app/volleyball/",
    accent: "#48d7c3",
    altHero: "DoThis volleyball athlete App Store marketing board",
    altWorkout: "DoThis volleyball workout board with real simulator UI"
  }
};

const root = document.documentElement;
const defaultSport = document.body.dataset.defaultSport || "general";
const buttons = [...document.querySelectorAll("[data-sport-option]")];
const heroImage = document.querySelector("[data-sport-hero]");
const workoutImage = document.querySelector("[data-sport-workout]");
const benefit = document.querySelector("[data-sport-benefit]");
const label = document.querySelector("[data-sport-label]");
const actions = [...document.querySelectorAll("[data-sport-action]")];
const visual = document.querySelector("[data-sport-visual]");

function applySport(id, updateUrl = false) {
  const sport = sports[id] || sports.general;
  const activeId = sports[id] ? id : "general";

  const update = () => {
    root.style.setProperty("--sport-accent", sport.accent);
    document.body.dataset.sport = activeId;
    heroImage.src = sport.hero;
    heroImage.alt = sport.altHero;
    workoutImage.src = sport.workout;
    workoutImage.alt = sport.altWorkout;
    benefit.textContent = sport.benefit;
    label.textContent = sport.label;
    actions.forEach((action) => {
      action.textContent = sport.action;
      action.href = sport.route;
    });
    buttons.forEach((button) => {
      const selected = button.dataset.sportOption === activeId;
      button.setAttribute("aria-pressed", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const selectedButton = buttons.find((button) => button.dataset.sportOption === activeId);
    if (selectedButton && selectedButton.parentElement.scrollWidth > selectedButton.parentElement.clientWidth) {
      selectedButton.parentElement.scrollLeft = selectedButton.offsetLeft - ((selectedButton.parentElement.clientWidth - selectedButton.offsetWidth) / 2);
    }
    visual.dataset.activeSport = activeId;
  };

  if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.startViewTransition(update);
  } else {
    update();
  }

  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("sport", activeId);
    history.replaceState({}, "", url);
  }
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => applySport(button.dataset.sportOption, true));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
    if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = buttons.length - 1;
    buttons[next].focus();
    applySport(buttons[next].dataset.sportOption, true);
  });
});

const requested = new URLSearchParams(location.search).get("sport");
applySport(requested === null ? defaultSport : requested, false);
