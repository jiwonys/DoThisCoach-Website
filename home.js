(() => {
  "use strict";
  const MEDIA = "/assets/beyond-court/";
  const sports = {
    general: { label: "All sports", film: "tennis", account: "volleyball" },
    tennis: { label: "Tennis", film: "tennis", account: "tennis" },
    basketball: {
      label: "Basketball",
      film: "basketball",
      account: "basketball",
    },
    volleyball: { label: "Volleyball", film: "gym", account: "volleyball" },
    pickleball: { label: "Pickleball", film: "gym", account: "pickleball" },
    soccer: { label: "Soccer", film: "soccer", account: "soccer" },
  };
  const features = {
    workout: {
      label: "workout",
      title: "Training for the sport you love.",
      description:
        "Personalized sessions that take your sport, available equipment, training history, and feedback into account.",
    },
    fuel: {
      label: "nutrition",
      title: "Fuel the work. See the whole picture.",
      description:
        "Log your meals and follow your calories and macros alongside the training you’re putting in.",
    },
    "athlete-week": {
      label: "Athlete Week",
      title: "Make room for your next game.",
      description:
        "Plan lifting, sport, and recovery days in Athlete Week. Tell Coach how you feel so your training can take it into account.",
    },
    coach: {
      label: "Coach",
      title: "Real life changes. Talk it through.",
      description:
        "Share your schedule, equipment, and training feedback with Coach. Review the guidance and choose what works for you.",
    },
    progress: {
      label: "progress",
      title: "See the work you’ve put in.",
      description:
        "Keep track of the weights, reps, and workouts you actually complete. Look back on your training as you build consistency.",
    },
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = Boolean(navigator.connection?.saveData);

  class Film {
    constructor(section, button, name, image) {
      this.section = section;
      this.video = section.querySelector("video");
      this.button = button;
      this.image = image || section.querySelector("img");
      this.name = null;
      this.userPaused = saveData;
      this.inView = false;
      this.failed = false;
      this.epoch = 0;
      this.video.addEventListener("playing", () =>
        this.video.classList.add("ready"),
      );
      this.video.addEventListener("error", () => {
        this.failed = true;
        this.userPaused = true;
        this.video.classList.remove("ready");
        this.label();
      });
      button.addEventListener("click", () => {
        if (reduced.matches) return;
        if (this.failed) {
          this.failed = false;
          this.video.removeAttribute("src");
        }
        this.userPaused = !this.userPaused;
        if (this.userPaused) this.video.pause();
        else this.play();
        this.label();
      });
      new IntersectionObserver(
        ([entry]) => {
          this.inView = entry.isIntersecting;
          if (this.inView) this.play();
          else this.video.pause();
        },
        { threshold: 0.08 },
      ).observe(section);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) this.video.pause();
        else this.play();
      });
      reduced.addEventListener("change", () => {
        this.epoch++;
        if (reduced.matches) {
          this.video.pause();
          this.video.removeAttribute("src");
          this.video.load();
          this.video.classList.remove("ready");
        } else this.play();
        this.label();
      });
      this.select(name);
    }
    label() {
      const action = this.failed
        ? "Retry film"
        : this.userPaused
          ? "Play film"
          : "Pause film";
      this.button.disabled = reduced.matches;
      this.button.querySelector("span").textContent = reduced.matches
        ? "Reduced motion"
        : action;
      this.button.setAttribute(
        "aria-label",
        reduced.matches
          ? "Film disabled by reduced motion"
          : `${action} — ${this.section.dataset.filmSection}`,
      );
      this.button.removeAttribute("aria-pressed");
    }
    play() {
      if (this.userPaused || reduced.matches || document.hidden || !this.inView)
        return;
      const epoch = this.epoch;
      const src = `${MEDIA}${this.name}.mp4`;
      if (this.video.getAttribute("src") !== src) {
        this.video.src = src;
        this.video.load();
      }
      this.video.play()?.catch((error) => {
        if (epoch !== this.epoch || error.name === "AbortError") return;
        this.userPaused = true;
        this.label();
      });
    }
    select(name) {
      if (name === this.name) return;
      this.epoch++;
      this.name = name;
      this.failed = false;
      this.video.pause();
      this.video.classList.remove("ready");
      this.video.removeAttribute("src");
      this.video.load();
      this.image.src = `${MEDIA}${name}-poster.jpg`;
      this.video.poster = this.image.src;
      this.play();
      this.label();
    }
  }

  const heroFilm = new Film(
    document.querySelector(".hero"),
    document.querySelector("#motion"),
    "tennis",
    document.querySelector("#poster"),
  );
  new Film(
    document.querySelector(".practice-film"),
    document.querySelector("[data-training-motion]"),
    "gym",
  );
  let sport = "general",
    feature = "workout",
    billing = "monthly";
  const readState = () => {
    const params = new URLSearchParams(location.search);
    sport = Object.hasOwn(sports, params.get("sport"))
      ? params.get("sport")
      : "general";
    feature = Object.hasOwn(features, params.get("view"))
      ? params.get("view")
      : "workout";
    billing = params.get("billing") === "yearly" ? "yearly" : "monthly";
  };
  const writeState = () => {
    const url = new URL(location.href);
    for (const [key, value, fallback] of [
      ["sport", sport, "general"],
      ["view", feature, "workout"],
      ["billing", billing, "monthly"],
    ]) {
      if (value === fallback) url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    }
    history.pushState({}, "", url);
  };
  function render() {
    const selected = sports[sport],
      content = features[feature];
    document.body.dataset.sport = sport;
    document
      .querySelectorAll("button[data-sport]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.sport === sport),
        ),
      );
    document
      .querySelectorAll("[data-view]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.view === feature),
        ),
      );
    document.querySelectorAll("[data-download]").forEach((link) => {
      link.href = sport === "general" ? "/app/" : `/app/${sport}/`;
    });
    const screen = document.querySelector("#app-screen");
    screen.src = `/assets/next-game/${sport}-${feature}.webp`;
    screen.alt = `Real DoThis ${content.label} screen from an example ${selected.account} account`;
    const fullSize = document.querySelector("#screen-link");
    fullSize.href = screen.src;
    fullSize.setAttribute(
      "aria-label",
      `${screen.alt} — view full size in a new tab`,
    );
    document.querySelector("#screen-caption").textContent =
      `Actual DoThis screen · Example ${selected.account} account`;
    document.querySelector("#proof-title").textContent = content.title;
    document.querySelector("#proof-description").textContent =
      content.description;
    document.querySelector("#film-label").textContent =
      selected.film === "gym"
        ? `Off-court training · ${selected.label}`
        : sport === "general"
          ? "The next point starts here."
          : `Built beyond the ${sport === "soccer" ? "field" : "court"}.`;
    document.querySelector("#closing-poster").src =
      `${MEDIA}${selected.film}-poster.jpg`;
    document.querySelector("#selection-status").textContent =
      `${selected.label}: ${content.title}`;
    heroFilm.select(selected.film);
    const yearly = billing === "yearly";
    document
      .querySelectorAll("[data-billing]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.billing === billing),
        ),
      );
    document.querySelector("[data-price]").textContent = yearly
      ? "$69.99"
      : "$6.99";
    document.querySelector("[data-price-period]").textContent = yearly
      ? " / year"
      : " / month";
    document.querySelector("[data-price-detail]").textContent = yearly
      ? "$69.99 billed yearly. Save $13.89 vs. 12 monthly payments."
      : "Choose Premium after your free Preview. Confirm availability and local prices in the app.";
  }
  document.querySelectorAll("button[data-sport]").forEach((button) =>
    button.addEventListener("click", () => {
      sport = button.dataset.sport;
      writeState();
      render();
    }),
  );
  document.querySelectorAll("[data-view]").forEach((button) =>
    button.addEventListener("click", () => {
      feature = button.dataset.view;
      writeState();
      render();
    }),
  );
  document.querySelectorAll("[data-feature]").forEach((link) =>
    link.addEventListener("click", () => {
      feature = link.dataset.feature;
      writeState();
      render();
    }),
  );
  document.querySelectorAll("[data-billing]").forEach((button) =>
    button.addEventListener("click", () => {
      billing = button.dataset.billing;
      writeState();
      render();
    }),
  );
  addEventListener("popstate", () => {
    readState();
    render();
  });
  const menu = document.querySelector(".mobile-menu");
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.open = false;
    }),
  );
  addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  // Preserve the existing local-only homepage click event; no tracker is added.
  document.querySelectorAll('[data-download]').forEach(link => link.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('dothis:cta', {detail: {
      event: 'homepage_app_store_click', sport, location: link.dataset.ctaLocation
    }}));
  }));
  readState();
  render();
})();
