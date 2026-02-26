
(async function () {
  const isOverlapping = function (element, otherElements) {
    const overlaps = (first, second) => {
      const fLeft = first.offsetLeft,
        fRight = fLeft + first.offsetWidth,
        sLeft = second.offsetLeft,
        sRight = sLeft + second.offsetWidth;
      const fTop = first.offsetTop,
        fBottom = fTop + first.offsetHeight,
        sTop = second.offsetTop,
        sBottom = sTop + second.offsetHeight;
      return !(
        fLeft >= sRight ||
        sLeft >= fRight ||
        fTop >= sBottom ||
        sTop >= fBottom
      );
    };
    return otherElements.some((other) => overlaps(element, other));
  };

  function isIntoView(elem) {
    const rect = elem.getBoundingClientRect();
    return rect.bottom >= 0 && rect.top <= window.innerHeight;
  }

  function wordCloud(container, wordArray) {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const center = {
      x: width / 2.0,
      y: height / 2.0,
    };

    const step = 1.0;
    const placedWords = [];
    const ratio = width / height;

    const drawTag = function (word) {
      const existing = document.getElementById(word.id);
      if (existing) {
        existing.style.transition = "opacity 0.5s";
        existing.style.opacity = "0";
        setTimeout(() => existing.remove(), 500);
      }

      const radius = { value: Math.random() };

      const wSpan = document.createElement("span");
      wSpan.classList.add("word", "w" + word.weight);
      const textSpan = document.createElement("span");
      textSpan.classList.add("word-text");
      textSpan.textContent = word.text;
      wSpan.appendChild(textSpan);

      container.appendChild(wSpan);

      const wWidth = wSpan.offsetWidth;
      const wHeight = wSpan.offsetHeight;
      let left = center.x - wWidth / 2.0;
      let top = center.y - wHeight / 2.0;

      const style = wSpan.style;
      style.transitionDuration = "0.0s";
      style.position = "absolute";
      style.left = left + "px";
      style.top = top + "px";

      while (isOverlapping(wSpan, placedWords)) {
        style.opacity = "0";
        radius.value += step;
        left =
          center.x - wWidth / 2.0 + radius.value * Math.cos(radius.value) * ratio;
        top = center.y + radius.value * Math.sin(radius.value) - wHeight / 2.0;
        style.left = left + "px";
        style.top = top + "px";
      }

      style.transitionDuration = "1.0s";
      style.opacity = "1";

      placedWords.push(wSpan);
    };

    const runWord = function (i) {
      if (i >= wordArray.length) {
        return;
      }
      if (isIntoView(cloudEl)) {
        drawTag(wordArray[i]);
        setTimeout(() => runWord(i + 1), 50);
      } else {
        setTimeout(() => runWord(i), 500);
      }
    };
    runWord(0);
  }

  const cloudEl = document.querySelector(".cloud");
  if (!cloudEl) return;

  // Hide the static fallback now that JS is running
  const staticEl = document.querySelector(".cloud-static");
  if (staticEl) staticEl.style.display = "none";

  const data = await (await fetch("/data/cloud.json")).json();
  const cloud = data.cloud.sort(function (a, b) {
    return a.text < b.text ? 1 : -1;
  });
  let started = false;

  const runWhenInView = function () {
    if (isIntoView(cloudEl) && !started) {
      started = true;
      wordCloud(cloudEl, cloud);
    }
  };

  runWhenInView();
  window.addEventListener("scroll", runWhenInView);
})();
