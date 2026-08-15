import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { experienceStore, setExperienceChapter } from "../store/experienceStore";

gsap.registerPlugin(ScrollTrigger);

function setSystem(key, { focus = false } = {}) {
  const controls = [...document.querySelectorAll("[data-system]")];
  const screens = [...document.querySelectorAll("[data-system-screen]")];
  const selected = controls.find((control) => control.dataset.system === key);
  if (!selected) return;

  controls.forEach((control) => control.setAttribute("aria-selected", String(control === selected)));
  screens.forEach((screen) => {
    const active = screen.dataset.systemScreen === key;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
  });
  experienceStore.setState({ activeSystem: key });
  if (focus) selected.focus();
}

function initInteractions() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const main = document.getElementById("main-content");
  const skipLink = document.querySelector(".skip-link");
  if (main && skipLink) {
    main.tabIndex = -1;
    skipLink.addEventListener("click", () => window.setTimeout(() => main.focus({ preventScroll: true }), 0));
  }

  const adaptiveDemo = document.querySelector("[data-adaptive-demo]");
  const adaptTrigger = document.querySelector("[data-adapt-trigger]");
  adaptTrigger?.addEventListener("click", () => {
    const adapted = !adaptiveDemo.classList.contains("is-adapted");
    adaptiveDemo.classList.toggle("is-adapted", adapted);
    adaptTrigger.setAttribute("aria-pressed", String(adapted));
    adaptTrigger.querySelector("span").textContent = adapted ? "−" : "+";
    adaptTrigger.lastChild.textContent = adapted ? " Reset the day" : " I have volleyball tonight at 7 PM";
    experienceStore.setState({ adapted });
  });

  const coachDemo = document.querySelector("[data-coach-demo]");
  const coachTrigger = document.querySelector("[data-coach-resolve]");
  coachTrigger?.addEventListener("click", () => {
    const resolved = !coachDemo.classList.contains("is-resolved");
    coachDemo.classList.toggle("is-resolved", resolved);
    coachTrigger.setAttribute("aria-pressed", String(resolved));
    coachTrigger.textContent = resolved ? "Reset the conflict" : "Let Coach resolve the conflict";
  });

  const systemControls = [...document.querySelectorAll("[data-system]")];
  systemControls.forEach((control, index) => {
    control.addEventListener("click", () => setSystem(control.dataset.system));
    control.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
      const next = (index + direction + systemControls.length) % systemControls.length;
      setSystem(systemControls[next].dataset.system, { focus: true });
    });
  });

  document.querySelectorAll("[data-cta]").forEach((link) => {
    link.addEventListener("click", () => {
      const detail = { location: link.dataset.cta, href: link.href };
      window.dispatchEvent(new CustomEvent("dothis:cta", { detail }));
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: "app_store_cta_click", ...detail });
    });
  });

  window.addEventListener(
    "pointermove",
    (event) => {
      experienceStore.setState({ pointer: { x: event.clientX / window.innerWidth, y: 1 - event.clientY / window.innerHeight } });
    },
    { passive: true },
  );
}

function initFullMotion() {
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.88, touchMultiplier: 1.02 });
  const tick = (time) => lenis.raf(time * 1000);
  let priorVelocity = 0;

  lenis.on("scroll", ({ progress, velocity }) => {
    const smoothedVelocity = priorVelocity * 0.7 + velocity * 0.3;
    priorVelocity = smoothedVelocity;
    experienceStore.setState({ progress, scrollVelocity: smoothedVelocity });
    ScrollTrigger.update();
  });
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll("[data-chapter]").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 54%",
      end: "bottom 46%",
      onEnter: () => setExperienceChapter(section.dataset.chapter),
      onEnterBack: () => setExperienceChapter(section.dataset.chapter),
    });
  });

  gsap.to(".hero-copy", {
    yPercent: -16,
    opacity: 0.08,
    ease: "none",
    scrollTrigger: { trigger: ".hero-chapter", start: "48% top", end: "bottom top", scrub: true },
  });

  gsap.to(".hero-system-map", {
    yPercent: -8,
    opacity: 0.2,
    ease: "none",
    scrollTrigger: { trigger: ".hero-chapter", start: "45% top", end: "bottom top", scrub: true },
  });

  document.querySelectorAll('[data-reveal="mask"]').forEach((target) => {
    gsap.to(target, {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "power3.inOut",
      scrollTrigger: { trigger: target, start: "top 86%", end: "top 54%", scrub: 0.35 },
    });
  });

  document.querySelectorAll('[data-reveal="clip"]').forEach((target) => {
    gsap.to(target, {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "power3.inOut",
      scrollTrigger: { trigger: target, start: "top 88%", end: "top 56%", scrub: 0.4 },
    });
  });

  document.querySelectorAll('[data-reveal="plane"]').forEach((target) => {
    gsap.to(target, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: target, start: "top 90%", end: "top 58%", scrub: 0.35 },
    });
  });

  const systemKeys = ["today", "workout", "food", "coach", "goals", "progress"];
  ScrollTrigger.create({
    trigger: ".systems-chapter",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: ({ progress }) => setSystem(systemKeys[Math.min(systemKeys.length - 1, Math.floor(progress * systemKeys.length))]),
  });

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}

export function initExperienceMotion() {
  initInteractions();
  const nav = document.querySelector("[data-site-nav]");
  const updateNav = () => nav?.classList.toggle("is-scrolled", window.scrollY > 20);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
  if (reducedMotion) return () => window.removeEventListener("scroll", updateNav);

  const destroyMotion = initFullMotion();
  return () => {
    destroyMotion();
    window.removeEventListener("scroll", updateNav);
  };
}
