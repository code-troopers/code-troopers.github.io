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