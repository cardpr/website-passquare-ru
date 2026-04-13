(function () {
  var KEY = "pq-theme";

  function valid(t) {
    return t === "light" || t === "dark";
  }

  function writeStored(t) {
    try {
      localStorage.setItem(KEY, t);
    } catch (e) {}
  }

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    return valid(t) ? t : "light";
  }

  function applyTheme(t) {
    if (!valid(t)) t = systemPrefersDark() ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
    writeStored(t);
    syncToggle();
  }

  function syncToggle() {
    var dark = currentTheme() === "dark";
    var buttons = document.querySelectorAll(".pq-theme-toggle");
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.title = dark ? "Light theme" : "Dark theme";
      var sun = btn.querySelector(".pq-theme-toggle__sun");
      var moon = btn.querySelector(".pq-theme-toggle__moon");
      if (sun && moon) {
        sun.style.display = dark ? "block" : "none";
        moon.style.display = dark ? "none" : "block";
      }
    });
  }

  function toggle() {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  }

  function createThemeButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pq-theme-toggle";
    btn.innerHTML =
      '<span class="pq-theme-toggle__icon" aria-hidden="true">' +
      '<svg class="pq-theme-toggle__moon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 14.5A8.5 8.5 0 0110.5 4a8.44 8.44 0 003.55-.75 8.5 8.5 0 019.45 9.45 8.44 8.44 0 01-.75 3.55A8.5 8.5 0 0121 14.5z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/></svg>' +
      '<svg class="pq-theme-toggle__sun" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.75"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>' +
      "</span>";
    btn.addEventListener("click", toggle);
    return btn;
  }

  function injectToggle() {
    if (document.querySelector(".pq-theme-toggle")) return;

    var wrap = document.querySelector("#t-header .t228__right_buttons_wrap");
    var loginSlot = wrap && wrap.querySelector(".t228__right_buttons_but");
    if (wrap && loginSlot) {
      var desk = document.createElement("div");
      desk.className = "pq-theme-toggle-wrap pq-theme-toggle-wrap--desk";
      desk.appendChild(createThemeButton());
      wrap.insertBefore(desk, loginSlot);
    }

    var mob = document.querySelector("#t-header .tmenu-mobile__container");
    var burger = mob && mob.querySelector(".t-menuburger");
    if (mob && burger) {
      var mobWrap = document.createElement("div");
      mobWrap.className = "pq-theme-toggle-wrap pq-theme-toggle-wrap--mob";
      mobWrap.appendChild(createThemeButton());
      mob.insertBefore(mobWrap, burger);
    }

    if (!document.querySelector(".pq-theme-toggle")) {
      var fb = createThemeButton();
      fb.classList.add("pq-theme-toggle--floating");
      document.body.appendChild(fb);
    }

    syncToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectToggle);
  } else {
    injectToggle();
  }

  window.pqSetTheme = applyTheme;
})();
