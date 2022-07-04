// main.js

const navbarToggler = document.getElementById("navbar-toggler");
const dashboardModal = document.getElementById("dashboard-modal");

// When the navbarToggler is clicked, show and hide the navbar content.
navbarToggler.addEventListener("click", function () {

    // If the collapsable div doesnt have inline maxHeight styling, show it. If it does, hide it.
    const content = this.nextElementSibling.children[1];
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.paddingTop = null;
    } else {
        content.style.paddingTop = "10px";
        content.style.maxHeight = "1000px";
    }
});

/*
// When the dashboard modal is clicked outside of the dashboard box, hide it.
dashboardModal.addEventListener("click", function (e) {
    if (dashboardModal.style.display == "flex" && e.target == dashboardModal) {
        toggleModal()
    }
})

// Show or hide the main modal when clicked.
function toggleModal() {
    switch (dashboardModal.style.display) {
        case dashboardModal.style.display = "flex":
            dashboardModal.style.display = "none"
            break;
        case dashboardModal.style.display = "none":
            dashboardModal.style.display = "flex"
    }
}
*/
