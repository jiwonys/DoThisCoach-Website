document.querySelectorAll(".article-download").forEach((link) => {
  link.addEventListener("click", () => {
    const detail = {
      event: "article_app_store_click",
      article: link.dataset.articleSlug || "unknown",
      location: link.dataset.ctaLocation || "unknown",
    };
    window.dispatchEvent(new CustomEvent("dothis:cta", { detail }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
  });
});
