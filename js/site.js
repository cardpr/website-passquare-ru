(function () {
  var versionEl = document.createElement("div");
  versionEl.className = "site-version";
  versionEl.textContent = "version: " + SITE_VERSION;
  var footerWrap = document.querySelector(".footer .wrap") || document.querySelector(".footer");
  if (footerWrap) footerWrap.appendChild(versionEl);
  else document.body.appendChild(versionEl);

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Открыть меню");
      });
    });
  }

  var cookie = document.getElementById("cookie-banner");
  var cookieKey = "psq_cookie_ok";
  if (cookie && !localStorage.getItem(cookieKey)) {
    cookie.classList.add("is-open");
    var close = cookie.querySelector(".cookie__close");
    if (close) {
      close.addEventListener("click", function () {
        localStorage.setItem(cookieKey, "1");
        cookie.classList.remove("is-open");
      });
    }
  }

  var PREFIX = "cardpr_cookie_";
  var UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var params = new URLSearchParams(window.location.search);
  if (params.has("utm_source")) {
    UTMS.forEach(function (name) {
      document.cookie = PREFIX + name + "=; path=/; max-age=-1";
      var value = params.get(name);
      if (value) {
        document.cookie =
          PREFIX +
          name +
          "=" +
          encodeURIComponent(value) +
          "; path=/; max-age=" +
          14 * 24 * 3600;
      }
    });
  }

  var extras = [];
  document.cookie.split(";").forEach(function (part) {
    var cookiePart = part.trim();
    if (cookiePart.indexOf(PREFIX) === 0) extras.push(cookiePart.slice(PREFIX.length));
  });
  if (extras.length) {
    document.querySelectorAll("a[href]").forEach(function (link) {
      try {
        var url = new URL(link.href, window.location.href);
        if (!/(^|\.)(passquare|cardpr)\./i.test(url.hostname)) return;
        if (url.hostname === window.location.hostname) return;
        if (url.protocol === "mailto:") return;
        extras.forEach(function (pair) {
          var bits = pair.split("=");
          if (bits[0] && !url.searchParams.has(bits[0])) {
            url.searchParams.set(bits[0], decodeURIComponent(bits.slice(1).join("=") || ""));
          }
        });
        link.href = url.toString();
      } catch (err) {}
    });
  }

  setTimeout(function () {
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(96747582, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }, 2000);
})();
