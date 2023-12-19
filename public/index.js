
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

// document.querySelector("button").addEventListener("click", function () {
//     document.querySelector("#navbar").classList.toggle("hide")
// });