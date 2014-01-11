'use strict';

$(function () {
    // Handler for .ready() called.
    $('[data-scrollToLink]').each(function (i, l) {
        var $link = $(l);
        $link.on('click', function () {
            $('body').scrollTo('#' + $link.attr('data-scrollToLink'), 500, {offset: {top: -50} });
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
                                      afterInit: function () {
                                          $("[title]").tooltip();
                                      }
                                  });

    $(".projects-carousel").owlCarousel({
                                               items: 4, //10 items above 1000px browser width
                                               itemsTablet: [600, 2], //2 items between 600 and 0
                                               itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
                                               autoPlay: 3000,
                                               stopOnHover: true,
                                               lazyLoad: true,
                                               afterInit: function () {
                                                   $("[title]").tooltip();
                                               }
                                           });
});