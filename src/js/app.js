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
  breakpoints: {
    768:{
      slidesPerView: 2
    }
  },
  navigation: {
    nextEl: '#stack .swiper-next',
    prevEl: '#stack .swiper-prev',
  }
})


new Swiper('#customers .swiper-container', {
  slidesPerView: 5,
  direction: 'horizontal',
  loop: true,
  breakpoints: {
    768:{
      slidesPerView: 1,
    }
  },

  navigation: {
    nextEl: '#customers .swiper-next',
    prevEl: '#customers .swiper-prev',
  }
})

// ================================
// START YOUR APP HERE
// ================================
