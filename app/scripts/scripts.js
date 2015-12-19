'use strict';

$(function () {
    $('[data-scrollToLink]').each(function (i, l) {
        var $link = $(l);
        var hash = $link.attr('data-scrollToLink');
        $link.on('click', function () {
            if (window.location.pathname !== "/") {
                window.location.href = "/#" + hash;
            } else {
                $('body').scrollTo('#' + hash, 500, {offset: {top: -50} });
            }
        });
    });
    $("#main-skills-carousel").owlCarousel({
                                               items: 7, //10 items above 1000px browser width
                                               itemsDesktop: [1000, 5], //5 items between 1000px and 901px
                                               itemsDesktopSmall: [900, 4], // betweem 900px and 601px
                                               itemsTablet: [600, 2], //2 items between 600 and 0
                                               itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
                                               autoPlay: 3000,
                                               stopOnHover: true,
                                               lazyLoad: true,

                                           });

    $(".projects-carousel").owlCarousel({
                                            items: 4, //10 items above 1000px browser width
                                            itemsTablet: [600, 2], //2 items between 600 and 0
                                            itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
                                            autoPlay: 3000,
                                            stopOnHover: true,
                                            lazyLoad: true,

                                        });
    if (window.addEventListener) {
        var a = [];
        window.addEventListener("keydown", function (b) {
            a.push(b.keyCode);
            0 <= a.toString().indexOf("38,38,40,40,37,39,37,39,66,65") &&
            (a = [], (new Audio("/audio/march.mp3")).play())
        }, !0)
    }

    var maxHeight = 0;
    $("#articles article > div").each(function (i, d) {
        var outerHeight = $(d).outerHeight();
        if (outerHeight > maxHeight) {
            maxHeight = outerHeight;
        }
    });
    $("#articles article > div").each(function (i, d) {
        $(d).css("height",maxHeight);
    });
    $(".project-info-button").click(function(e){
      $(e.target).parent().toggleClass("show-quote");
    })
})
;
