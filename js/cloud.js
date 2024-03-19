
(async function($) {

  const isOverlapping = function(element, otherElements) {
    const isOverlapping = (first, second) => {
      const fLeft = first.offsetLeft, fRight = fLeft + first.offsetWidth,
        sLeft = second.offsetLeft, sRight = sLeft + second.offsetWidth;
      const fTop = first.offsetTop, fBottom = fTop + first.offsetHeight,
        sTop = second.offsetTop, sBottom = sTop + second.offsetHeight;
      return !(fLeft >= sRight || sLeft >= fRight || fTop >= sBottom || sTop >= fBottom);
    };
    return otherElements.some((otherElement) => isOverlapping(element, otherElement));
  };

  function isIntoView(elem)
  {
    var documentViewTop = $(window).scrollTop();
    var documentViewBottom = documentViewTop + $(window).height();

    var elementTop = $(elem).offset().top;
    var elementBottom = elementTop + $(elem).height();
    return ((elementBottom >= documentViewTop) && (elementTop <= documentViewBottom));
  }

  $.fn.wordCloud = function(word_array) {
    var $this = this;
    var width = $this.width();
    var height = $this.height();
    var center = {
      x: width / 2.0,
      y: height / 2.0
    };

    var step = 1.0;
    var placedWords = [];
    var ratio = width / height;

    var drawTag = function(word) {
      $(`#${word.id}`).fadeOut(500, function() {
        $(`#${word.id}`).remove();
      });
      var radius = Math.random();

      var wSpan = $("<span>").addClass("word w" + word.weight).append(word.text);

      $this.append(wSpan);

      var wWidth = wSpan.width();
      var wHeight = wSpan.height();
      var left = center.x - wWidth / 2.0;
      var top = center.y - wHeight / 2.0;

      var word_style = wSpan[0].style;
      word_style.transitionDuration = "0.0s";
      word_style.position = "absolute";
      word_style.left = left + "px";
      word_style.top = top + "px";

      while (isOverlapping(wSpan[0], placedWords)) {
        word_style.opacity = "0";
        radius += step;
        left = center.x - (wWidth / 2.0) + (radius * Math.cos(radius)) * ratio;
        top = center.y + radius * Math.sin(radius) - (wHeight / 2.0);
        word_style.left = left + "px";
        word_style.top = top + "px";
      }

      word_style.transitionDuration = "1.0s";
      word_style.opacity = "1";

      placedWords.push(wSpan[0]);
    };

    var runWord = function(i) {
      if (i >= word_array.length) {
        return;
      }
      if (isIntoView($(".cloud"))) {
        drawTag(word_array[i]);
        setTimeout(() => {
          runWord(i + 1);
        }, 150);
      } else {
        setTimeout(() => {
          runWord(i);
        }, 500);
      }
    };
    runWord(0);

    return $this;
  };

  const data = await (await fetch("/data/cloud.json")).json();
  const cloud = data.cloud.sort(function(a, b) { return a.text < b.text ? 1 : -1; });
  var started = false;

  const runWhenInView = function() {
    if (isIntoView($(".cloud")) && !started) {
      started = true;
      $(".cloud").wordCloud(cloud);
    }
  };

  runWhenInView();
  $(window).on("scroll", runWhenInView);


})(jQuery);
