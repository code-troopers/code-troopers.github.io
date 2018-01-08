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
  spaceBetween: 32,
  slidesPerView: 'auto',
  direction: 'horizontal',
  //loop: true, //looping makes weird things
  //loopedSlides: 1,
  //centeredSlides: true,

  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  }
})

// ================================
// START YOUR APP HERE
// ================================
