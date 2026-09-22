var SITE_VERSION = "5.03.212";
var SITE_VERSION_URL =
  (document.currentScript && document.currentScript.src.split("?")[0]) || "/js/version.js";

function siteCss(href) {
  document.write('<link rel="stylesheet" href="' + href + "?v=" + SITE_VERSION + '">');
}

function siteJs(src, attrs) {
  var extra = attrs ? " " + attrs : "";
  document.write('<script src="' + src + "?v=" + SITE_VERSION + '"' + extra + "></script>");
}

function compareVersions(version1, version2) {
  var v1parts = version1.split(".").map(Number);
  var v2parts = version2.split(".").map(Number);
  var maxLength = Math.max(v1parts.length, v2parts.length);
  var i;
  for (i = 0; i < maxLength; i++) {
    var v1part = v1parts[i] || 0;
    var v2part = v2parts[i] || 0;
    if (v1part < v2part) return -1;
    if (v1part > v2part) return 1;
  }
  return 0;
}

var versionPromptOpen = false;

function versionUpdateMessage(current, next) {
  if ((document.documentElement.lang || "").toLowerCase().indexOf("ru") === 0) {
    return (
      "Доступна новая версия.\n\n" +
      "Текущая версия: " +
      current +
      "\n" +
      "Новая версия: " +
      next +
      "\n\n" +
      "Обновите страницу."
    );
  }
  return (
    "A new version of the application is available.\n\n" +
    "Current version: " +
    current +
    "\n" +
    "New version: " +
    next +
    "\n\n" +
    "Please refresh the page."
  );
}

function checkSiteVersion() {
  if (versionPromptOpen || !window.fetch) return;
  fetch(SITE_VERSION_URL + "?t=" + Date.now(), { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) return null;
      return response.text();
    })
    .then(function (text) {
      if (!text || versionPromptOpen) return;
      var match = /SITE_VERSION\s*=\s*"([^"]+)"/.exec(text);
      if (!match) return;
      var remote = match[1];
      if (compareVersions(SITE_VERSION, remote) >= 0) return;
      versionPromptOpen = true;
      var refresh = window.confirm(versionUpdateMessage(SITE_VERSION, remote));
      versionPromptOpen = false;
      if (refresh) window.location.reload();
    })
    .catch(function () {});
}

setInterval(checkSiteVersion, 60000);
