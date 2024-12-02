
// NAVBAR TOGGLE DESIGN:
const navbarButton = document.querySelector("#navbar");
const navbarToggle = document.querySelector(".mobile-navbar-toggle");

navbarToggle.addEventListener("click", () => {
    const visibility = navbarButton.getAttribute("data-visible");;
    if (visibility === "false") {
        navbarButton.setAttribute("data-visible", true);
        navbarToggle.setAttribute("aria-expanded", true);
    } else if (visibility === "true") {
        navbarButton.setAttribute("data-visible", false);
        navbarToggle.setAttribute("aria-expanded", false);
    }
});


// COTACT FORM SENT - Here we are reloading the page 5s after the send button has been pressed.
const confirmationWindow = document.querySelector(".confirmation-container");
const visibility = confirmationWindow.getAttribute("style");

if (visibility === "visibility: visible;") {
    setTimeout(function () {
        window.location = "https://www.properfix.com";
    }, 5000);
}