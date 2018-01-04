/**
 * Application entry point
 */

// Load application styles
import 'scss/main.scss';
import hljs from 'highlight.js';
import 'lightbox2';
import Swiper from 'swiper';

hljs.initHighlightingOnLoad();
new Swiper('#stack .swiper-container', {
  width: 1200, //this break responsive but width detection does not work automagically :(
  slidesPerView: 7,
  direction: 'horizontal',
  loop: true,
  loopAdditionalSlides: 7,
  centeredSlides: true,

  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  }
})

// ================================
// START YOUR APP HERE
// ================================
