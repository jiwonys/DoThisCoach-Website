import { initExperienceMotion } from "./motion/initMotion";

initExperienceMotion();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const container = document.getElementById("experience-canvas-root");

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

async function loadCanvas() {
  if (!container || reducedMotion || !supportsWebGL()) return;
  try {
    const { mountExperienceCanvas } = await import("./webgl/ExperienceCanvas.jsx");
    mountExperienceCanvas(container);
  } catch {
    document.documentElement.classList.add("webgl-failed");
  }
}

if ("requestIdleCallback" in window) {
  if (window.matchMedia("(max-width: 760px)").matches) {
    const target = document.getElementById("adaptive-day");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        window.requestIdleCallback(loadCanvas, { timeout: 1200 });
      },
      { rootMargin: "320px 0px" },
    );
    if (target) observer.observe(target);
  } else {
    window.requestIdleCallback(loadCanvas, { timeout: 650 });
  }
} else {
  window.setTimeout(loadCanvas, window.matchMedia("(max-width: 760px)").matches ? 5000 : 80);
}
