(function() {

  const disableButton = document.createElement("a");
  disableButton.href = "#";
  disableButton.id = "disable-spotlight";
  disableButton.className = "btn dark";
  disableButton.textContent = "Désactiver le mode sombre";

  const spotlight = document.createElement("div");
  spotlight.id = "spotlight";

  document.body.append(disableButton, spotlight);

  function handleMouseMove(event) {
    const {clientX, clientY} = event;

    spotlight.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000FF 100px)`;
  }

  document.body.addEventListener("mousemove", handleMouseMove);

  disableButton.addEventListener("click", () => {
    disableApril();
    localStorage.setItem("disable-april", "true");
  });

  if (localStorage.getItem("disable-april") === "true") {
    disableApril();
  }

  function disableApril() {
    spotlight.style.display = "none";
    disableButton.style.display = "none";
    document.body.removeEventListener("mousemove", handleMouseMove);
  }
})();
