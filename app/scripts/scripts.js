'use strict';

$(function () {
    // Handler for .ready() called.
    var vars = [], hash;
    var q = document.URL.split('?')[1];
    if(q != undefined){
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            hash = q[i].split('=');
            vars.push(hash[1]);
            vars[hash[0]] = hash[1];
        }
    }
    console.log(vars);
    $('[data-scrollToLink]').each(function (i, l) {
        var $link = $(l);
        var hash = $link.attr('data-scrollToLink');
        $link.on('click', function () {
            if (window.location.pathname !== "/") {
                window.location.href = "/?h="+hash;
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