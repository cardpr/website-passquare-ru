var SITE_VERSION = "5.03.210";

function siteCss(href) {
  document.write('<link rel="stylesheet" href="' + href + "?v=" + SITE_VERSION + '">');
}

function siteJs(src, attrs) {
  var extra = attrs ? " " + attrs : "";
  document.write('<script src="' + src + "?v=" + SITE_VERSION + '"' + extra + "></script>");
}
