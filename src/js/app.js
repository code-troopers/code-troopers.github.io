// JS Goes here - ES6 supported
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// A11y: add accessible labels to lightbox2 buttons
document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    const cancel = document.querySelector(".lb-cancel");
    const close = document.querySelector(".lb-close");
    if (cancel && !cancel.getAttribute("aria-label")) {
      cancel.setAttribute("aria-label", "Annuler");
    }
    if (close && !close.getAttribute("aria-label")) {
      close.setAttribute("aria-label", "Fermer la lightbox");
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
