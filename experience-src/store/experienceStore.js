import { createStore } from "zustand/vanilla";

export const chapterOrder = ["hero", "adapt", "systems", "train", "coach", "progress", "preview"];

export const experienceStore = createStore(() => ({
  progress: 0,
  scrollVelocity: 0,
  chapter: 0,
  adapted: false,
  activeSystem: "today",
  pointer: { x: 0.5, y: 0.5 },
  quality: "high",
}));

export function setExperienceChapter(name) {
  const chapter = Math.max(0, chapterOrder.indexOf(name));
  experienceStore.setState({ chapter });
}
