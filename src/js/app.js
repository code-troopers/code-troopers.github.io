/**
 * Application entry point
 */

// Load application styles
import 'scss/main.scss'
import hljs from 'highlight.js'
import 'lightbox2'
import Swiper from 'swiper'
import scrollMonitor from 'scrollmonitor'
import CountUp from 'countup'
import 'intersection-observer'
import lozad from 'lozad'
import animateScrollTo from 'animated-scroll-to'

hljs.initHighlightingOnLoad();

var swipers = []
swipers.push(new Swiper('#stack .swiper-container', {
    spaceBetween: 32,
    init:false,
    slidesPerView: 'auto',
    direction: 'horizontal',
    //loop: true, //looping makes weird things
    //loopedSlides: 1,
    //centeredSlides: true,
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        512: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 4
        }

    },
    navigation: {
        nextEl: '#stack .swiper-next',
        prevEl: '#stack .swiper-prev',
    }
}))


swipers.push(new Swiper('#customers .swiper-container', {
    slidesPerView: 5,
    init:false,
    direction: 'horizontal',
    loop: true,
    breakpoints: {
        1024: {
            slidesPerView: 1,
        },
        1280: {
            slidesPerView: 3,
        }
    },

    navigation: {
        nextEl: '#customers .swiper-next',
        prevEl: '#customers .swiper-prev',
    }
}))

window.onload = function () {
    lozad('.lozad',{
        rootMargin: '200px'
    }).observe();
    var elements = document.getElementsByClassName("count-up");
    //ie support
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.'
        };
        scrollMonitor.create(el).enterViewport(function () {
            var demo = new CountUp(this.watchItem, 0, this.watchItem.getAttribute('data-count'), 0, 3, options);
            if (!demo.error) {
                demo.start();
            } else {
                console.error(demo.error);
            }
            this.destroy();
        });
    }
    //to ensure everything is ready before displaying the swipers
    swipers.forEach(function(e){
        e.init();
    })
    var navItems = document.querySelectorAll('header nav a[href^=\\/\\#]')
    for (var i = 0; i < navItems.length; i++) {
        var navItem = navItems[i]
        navItem.addEventListener('click', function () {
          var chunks = this.href.split(/#/)
          if (chunks.length > 0) {
            animateScrollTo(document.querySelector('#' + chunks[chunks.length - 1]))
          }
        })
    }
};

// ================================
// START YOUR APP HERE
// ================================
