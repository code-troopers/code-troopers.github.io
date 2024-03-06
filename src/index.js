// JS Goes here - ES6 supported

import "./css/main.scss";
import "../node_modules/lightbox2/dist/js/lightbox-plus-jquery";


const hljs = require("../node_modules/highlight.js/lib/common");
hljs.highlightAll();


function updateMenu() {
    var scrollPosition = window.scrollY;

    var selectedSectionId = "brand";
    for (var section of document.querySelectorAll("section")) {
        var sectionTop = section.offsetTop - 200;
        var sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            selectedSectionId = section.id;
            break;
        }
    }

    var links = document.querySelectorAll("nav a");
    for (var link of links) {
        link.classList.remove("active");
        if (link.id.includes(selectedSectionId)) {
            link.classList.add("active");
        }
    }
}
window.addEventListener("scroll", updateMenu);
window.addEventListener("load", updateMenu);

// Matomo
var _paq = window._paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    var u = "//matomo.chapi.to/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '69']);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
})();