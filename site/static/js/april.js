
(async function($) {

  $("body").append("<a href='#' id='disable-spotlight' class='btn dark'>Désactiver le mode sombre</a><div id='spotlight'></div>");

  const spotlightEl = $("#spotlight");

  function handleMouseMove(event) {
    const {clientX, clientY} = event;

    spotlightEl[0].style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000FF 100px)`;
  }

  $("body").on("mousemove", handleMouseMove);

  $("#disable-spotlight").on("click", () => {
    disableApril();
    localStorage.setItem("disable-april", "true");
  });

  if (localStorage.getItem("disable-april") === "true") {
    disableApril();
  }

  function disableApril() {
    $("#spotlight")[0].style.display = "none";
    $("#disable-spotlight")[0].style.display = "none";
    $("body").off("mousemove", handleMouseMove);
  }
})(jQuery);
