/* =========================================================
   Nayan Dheke — Portfolio
   Tab switching, year, keyboard shortcuts, accessibility
   ========================================================= */

(function () {
  "use strict";

  /* --------------------------------
     TAB SWITCHING
  -------------------------------- */

  const tabs = Array.from(document.querySelectorAll(".tab"));
  const contents = Array.from(document.querySelectorAll(".tab-content"));
  const tabsBar = document.querySelector(".tabs");

  function activateTab(tab) {
    if (!tab || !tab.dataset.tab) return;

    const targetId = tab.dataset.tab;
    const targetContent = document.getElementById(targetId);
    if (!targetContent) return;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    contents.forEach((content) => {
      content.classList.toggle("active", content === targetContent);
    });

    // Scroll so the tab bar stays anchored below the sticky nav
    if (tabsBar) {
      const rect = tabsBar.getBoundingClientRect();
      if (rect.top < 0) {
        window.scrollTo({
          top: window.scrollY + rect.top - 58,
          behavior: "smooth",
        });
      }
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab));
  });


  /* --------------------------------
     ARROW KEY NAVIGATION (a11y)
  -------------------------------- */

  if (tabsBar) {
    tabsBar.addEventListener("keydown", (event) => {
      const currentIndex = tabs.findIndex((t) => t.classList.contains("active"));
      if (currentIndex === -1) return;

      let nextIndex = null;

      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      }
    });
  }


  /* --------------------------------
     KEYBOARD SHORTCUTS (1–4)
  -------------------------------- */

  document.addEventListener("keydown", (event) => {
    // Ignore if user is typing in an input
    const tag = (event.target && event.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || event.target?.isContentEditable) {
      return;
    }

    const map = {
      "1": "skills",
      "2": "projects",
      "3": "experience",
      "4": "resume",
    };

    const targetTab = map[event.key];
    if (targetTab) {
      const btn = document.querySelector(`[data-tab="${targetTab}"]`);
      if (btn) activateTab(btn);
    }
  });


  /* --------------------------------
     CURRENT YEAR
  -------------------------------- */

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();