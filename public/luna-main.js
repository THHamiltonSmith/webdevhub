// luna-main.js

const navbarToggler = document.getElementById("navbar-toggler");
const profileDropdownObj = document.getElementById("profile-dropdown");

const dropdowns = document.getElementsByClassName("dropdown-toggle");

for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", (e) => {
        const linkedDropdown = document.getElementById(e.target.getAttribute("nav-target"));

        if (linkedDropdown.classList.contains("show")) {
            linkedDropdown.classList.remove("show");
        } else {
            linkedDropdown.classList.add("show")
        }
    })
}

// When the navbarToggler is clicked, show and hide the navbar content.
navbarToggler.addEventListener("click", function () {
    //
    const content = this.nextElementSibling.children[1];
    const dropdownMenus = document.getElementsByClassName("dropdown-menu") 

    // If the collapsable div doesnt have inline maxHeight styling, show it. If it does, hide it.
    if (content.classList.contains("expanded")) {
        content.classList.remove("expanded");

        // Hide any dropdowns
        for (var i = 0; i < dropdownMenus.length; i++) {
            dropdownMenus[i].style.opacity = 0;
        }
    } else {
        content.classList.add("expanded");

        // Show any dropdowns
        for (var i = 0; i < dropdownMenus.length; i++) {
            dropdownMenus[i].style.opacity = 1;
        }
    }
});