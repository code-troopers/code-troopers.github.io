"use strict";

$(function ($) {
    // Handler for .ready() called.
    $("[data-scrollToLink]").each(function (i, l) {
        var $link = $(l);
        $link.on("click", function () {
            $('body').scrollTo('#' + $link.attr("data-scrollToLink"), 500, {offset: {top: -50} });
        });
    });
}(jQuery));
