// JS Goes here - ES6 supported
import process from "process";
import {Buffer} from "buffer";

window.process = process;
window.Buffer = Buffer;

import "./css/main.scss";
import "../node_modules/lightbox2/dist/js/lightbox-plus-jquery";

const hljs = require("../node_modules/highlight.js/lib/common");
hljs.highlightAll();

// Halloween theme: October 1-31
if (new Date().getMonth() === 9) {
  document.documentElement.classList.add("halloween");
}

// A11y: add accessible labels to lightbox2 buttons
const lightboxA11yObserver = new MutationObserver(() => {
  const cancel = document.querySelector(".lb-cancel");
  const close = document.querySelector(".lb-close");
  if (cancel && !cancel.getAttribute("aria-label")) {
    cancel.setAttribute("aria-label", "Annuler");
  }
  if (close && !close.getAttribute("aria-label")) {
    close.setAttribute("aria-label", "Fermer la lightbox");
  }
});
lightboxA11yObserver.observe(document.body, {childList: true, subtree: true});

// Responsive tables: copy column headers onto each cell so _blog.scss can
// stack rows as labeled cards on small screens
function stackContentTables() {
  document.querySelectorAll("#article .content table").forEach((table) => {
    const headers = [...table.querySelectorAll("thead th")].map((th) =>
      th.textContent.trim()
    );
    if (headers.length === 0) return;
    table.querySelectorAll("tbody tr").forEach((tr) => {
      [...tr.children].forEach((td, i) => {
        if (headers[i]) td.setAttribute("data-label", headers[i]);
      });
    });
    table.classList.add("stacked");
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", stackContentTables);
} else {
  stackContentTables();
}

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
    if (selectedSectionId !== "" && link.id.includes(selectedSectionId)) {
      link.classList.add("active");
    }
  }
}
window.addEventListener("scroll", updateMenu);
window.addEventListener("load", updateMenu);

// Matomo
var _paq = (window._paq = window._paq || []);
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
  var u = "//matomo.chapi.to/";
  _paq.push(["setTrackerUrl", u + "matomo.php"]);
  _paq.push(["setSiteId", "69"]);
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = u + "matomo.js";
  s.parentNode.insertBefore(g, s);
})();
