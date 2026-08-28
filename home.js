document.documentElement.classList.add("js");

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuButton = document.querySelector(".menu-button");
const navigation = document.getElementById("site-navigation");

const setMenu = (isOpen) => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector(".sr-only").textContent = isOpen ? "Close navigation" : "Open navigation";
  navigation.classList.toggle("is-open", isOpen);
};

menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    menuButton?.focus();
  }
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
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );
  revealTargets.forEach((target) => observer.observe(target));
}

const scenarios = {
  game: {
    input: "I have volleyball tonight at 7:00 PM.",
    response:
      "Keep tonight’s match as the priority. Use a short shoulder and knee primer; move heavy lower-body work to Thursday so your strength baseline stays intact.",
    actions: ["12-minute primer", "Review pre-game fuel", "Lower body Thursday"],
  },
  missed: {
    input: "I missed Tuesday’s strength session. Should I double up?",
    response:
      "Do not turn one missed lift into an overload day. Keep the highest-value session, trim lower-priority volume, and preserve your next sport session.",
    actions: ["Keep priority work", "Skip the double day", "Protect sport quality"],
  },
  recovery: {
    input: "My energy is low and my knee feels sore today.",
    response:
      "Reduce intensity and avoid the movement that aggravates your knee. Choose a pain-free recovery option, and stop if pain increases or symptoms feel unsafe.",
    actions: ["Lower fatigue", "Use pain-free options", "Stop for worsening pain"],
  },
};

const scenarioTabs = document.querySelectorAll(".scenario-tab");
const scenarioInput = document.getElementById("scenario-input");
const scenarioResponse = document.getElementById("scenario-response");
const scenarioActions = document.getElementById("scenario-actions");

scenarioTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const scenario = scenarios[tab.dataset.scenario];
    if (!scenario || !scenarioInput || !scenarioResponse || !scenarioActions) return;

    scenarioTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    scenarioInput.textContent = scenario.input;
    scenarioResponse.textContent = scenario.response;
    scenarioActions.replaceChildren(
      ...scenario.actions.map((action) => {
        const item = document.createElement("li");
        item.textContent = action;
        return item;
      }),
    );
  });
});
