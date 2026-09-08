(async function() {

  const isOverlapping = function(element, otherElements) {
    const overlaps = (first, second) => {
      const fLeft = first.offsetLeft, fRight = fLeft + first.offsetWidth,
        sLeft = second.offsetLeft, sRight = sLeft + second.offsetWidth;
      const fTop = first.offsetTop, fBottom = fTop + first.offsetHeight,
        sTop = second.offsetTop, sBottom = sTop + second.offsetHeight;
      return !(fLeft >= sRight || sLeft >= fRight || fTop >= sBottom || sTop >= fBottom);
    };
    return otherElements.some((otherElement) => overlaps(element, otherElement));
  };

  function isIntoView(elem)
  {
    if (!elem) {
      return false;
    }
    const rect = elem.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= window.innerHeight;
  }

  function wordCloud(container, word_array) {
    var width = container.clientWidth;
    var height = container.clientHeight;
    var center = {
      x: width / 2.0,
      y: height / 2.0
    };

    var step = 1.0;
    var placedWords = [];
    var ratio = width / height;

    var drawTag = function(word) {
      var previous = document.getElementById(word.id);
      if (previous) {
        previous.style.transition = "opacity 0.5s";
        previous.style.opacity = "0";
        setTimeout(() => previous.remove(), 500);
      }
      var radius = Math.random();

      var wSpan = document.createElement("span");
      wSpan.className = "word w" + word.weight;
      var wText = document.createElement("span");
      wText.className = "word-text";
      wText.textContent = word.text;
      wSpan.appendChild(wText);

      container.appendChild(wSpan);

      var wWidth = wSpan.offsetWidth;
      var wHeight = wSpan.offsetHeight;
      var left = center.x - wWidth / 2.0;
      var top = center.y - wHeight / 2.0;

      var word_style = wSpan.style;
      word_style.transitionDuration = "0.0s";
      word_style.position = "absolute";
      word_style.left = left + "px";
      word_style.top = top + "px";

      while (isOverlapping(wSpan, placedWords)) {
        word_style.opacity = "0";
        radius += step;
        left = center.x - (wWidth / 2.0) + (radius * Math.cos(radius)) * ratio;
        top = center.y + radius * Math.sin(radius) - (wHeight / 2.0);
        word_style.left = left + "px";
        word_style.top = top + "px";
      }

      word_style.transitionDuration = "1.0s";
      word_style.opacity = "1";

      placedWords.push(wSpan);
    };

    var runWord = function(i) {
      if (i >= word_array.length) {
        return;
      }
      if (isIntoView(container)) {
        drawTag(word_array[i]);
        setTimeout(() => {
          runWord(i + 1);
        }, 50);
      } else {
        setTimeout(() => {
          runWord(i);
        }, 500);
      }
    };
    runWord(0);
  }

  const cloudElement = document.querySelector(".cloud");
  if (!cloudElement) {
    return;
  }

  const data = await (await fetch("/data/cloud.json")).json();
  const cloud = data.cloud.sort(function(a, b) { return a.text < b.text ? 1 : -1; });
  var started = false;

  const runWhenInView = function() {
    if (isIntoView(cloudElement) && !started) {
      started = true;
      wordCloud(cloudElement, cloud);
    }
  };

  runWhenInView();
  window.addEventListener("scroll", runWhenInView, { passive: true });

})();
