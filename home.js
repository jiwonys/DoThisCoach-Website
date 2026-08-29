document.documentElement.classList.add("js");

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

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
  if (event.key !== "Escape") return;
  setMenu(false);
  menuButton?.focus();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) setMenu(false);
});

const revealTargets = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
  );
  revealTargets.forEach((target) => observer.observe(target));
}

const choices = {
  prep: {
    badge: "PREPARATION",
    duration: "Warm-up + cooldown",
    title: "Arrive ready. Leave the main workout out.",
    description: "A focused sports preparation session: 4–5 warmups, no separate main workout, and 1–3 cooldown exercises.",
    change: "Session structure and training dose",
  },
  light: {
    badge: "LIGHTER",
    duration: "Shorter · roughly ⅔ duration",
    title: "Keep the workout. Turn the dose down.",
    description: "A coordinated workout with fewer hard sets, less total volume, and lighter loading. Duration is rounded to five minutes and kept within 20–45 minutes.",
    change: "Duration, hard sets, volume, and loading",
  },
  full: {
    badge: "FULL",
    duration: "Normal duration + load",
    title: "Train fully—with the match still in view.",
    description: "A normal complete workout at your saved or requested duration. It still respects the match, current pain, readiness, equipment, and recent training.",
    change: "Workout selection and coordination",
  },
};

const choiceTabs = Array.from(document.querySelectorAll("[data-choice]"));
const choicePanel = document.getElementById("choice-panel");
const choiceBadge = document.getElementById("choice-badge");
const choiceDuration = document.getElementById("choice-duration");
const choiceTitle = document.getElementById("choice-title");
const choiceDescription = document.getElementById("choice-description");
const choiceChange = document.getElementById("choice-change");

const selectChoice = (tab) => {
  const choice = choices[tab?.dataset.choice];
  if (!choice || !choicePanel || !choiceBadge || !choiceDuration || !choiceTitle || !choiceDescription || !choiceChange) return;

  choiceTabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  choicePanel.setAttribute("aria-labelledby", tab.id);
  choiceBadge.textContent = choice.badge;
  choiceDuration.textContent = choice.duration;
  choiceTitle.textContent = choice.title;
  choiceDescription.textContent = choice.description;
  choiceChange.textContent = choice.change;
};

choiceTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectChoice(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + choiceTabs.length) % choiceTabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % choiceTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = choiceTabs.length - 1;
    const nextTab = choiceTabs[nextIndex];
    selectChoice(nextTab);
    nextTab.focus();
  });
});
