// JS Goes here - ES6 supported
import process from "process";
import { Buffer } from "buffer";

window.process = process;
window.Buffer = Buffer;

import "./css/main.scss";
import "./css/animations.css";

// Enable animations only when JS is available (progressive enhancement)
document.documentElement.classList.add("js");
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
    link.removeAttribute("aria-current");
    if (selectedSectionId !== "" && link.id.includes(selectedSectionId)) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  }
}
window.addEventListener("scroll", updateMenu);
window.addEventListener("load", updateMenu);

// Mobile hamburger menu
const hamburger = document.querySelector(".hamburger");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    const ul = hamburger.closest("nav").querySelector("ul");
    const isOpen = ul.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });
  document.querySelectorAll("header nav a").forEach((link) => {
    link.addEventListener("click", () => {
      const ul = hamburger.closest("nav").querySelector("ul");
      ul.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// A11y: add accessible labels to lightbox2 buttons
const lbObserver = new MutationObserver(() => {
  const cancel = document.querySelector(".lb-cancel");
  const close = document.querySelector(".lb-close");
  if (cancel && !cancel.getAttribute("aria-label")) {
    cancel.setAttribute("aria-label", "Annuler");
  }
  if (close && !close.getAttribute("aria-label")) {
    close.setAttribute("aria-label", "Fermer la lightbox");
  }
});
lbObserver.observe(document.body, { childList: true, subtree: true });

// Matomo (mode anonyme sans cookies - pas de bandeau RGPD nécessaire)
var _paq = (window._paq = window._paq || []);
_paq.push(["disableCookies"]);
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

// Matomo: track conversion events
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  if (href.startsWith("tel:")) {
    _paq.push(["trackEvent", "Contact", "Appel", href]);
  } else if (href.startsWith("mailto:")) {
    _paq.push(["trackEvent", "Contact", "Email", href]);
  } else if (href.includes("linkedin.com/company")) {
    _paq.push(["trackEvent", "Social", "LinkedIn", href]);
  } else if (href.includes("github.com/code-troopers")) {
    _paq.push(["trackEvent", "Social", "GitHub", href]);
  } else if (link.classList.contains("cta-hero")) {
    _paq.push(["trackEvent", "CTA", "Hero", href]);
  }
});

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((el) => {
  revealObserver.observe(el);
});

// === NAV SCROLL EFFECT ===
const headerEl = document.querySelector("header");
if (headerEl) {
  const onNavScroll = () => {
    headerEl.classList.toggle("nav-scrolled", window.scrollY > 80);
  };
  window.addEventListener("scroll", onNavScroll, { passive: true });
  onNavScroll();
}

// === HERO ENTRANCE ===
window.addEventListener("load", () => {
  document.querySelectorAll(".hero-enter").forEach((el) => {
    el.classList.add("visible");
  });
});

// === COUNTER ANIMATION ===
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-count"), 10);
  const prefix = el.getAttribute("data-count-prefix") || "";
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = prefix + current;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count]").forEach((el) => {
  counterObserver.observe(el);
});
