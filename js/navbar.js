// |||||||||||||||
// index.html doesnt use this script
// |||||||||||||||

import { saveToSessionStorage } from "../utils/sessionStorageManipulation.js";

const navbar = document.querySelector("#navbar");
const cartButton = document.querySelector("#cart-button");
const cartBadge = document.querySelector("#cart-quantity-badge");
// This button is used for redirection to the search page and saving the search query in session storage
const searchButtonNavigation = document.querySelector(".search-btn-nav");

// LOCAL STORAGE PREFIX
const LOCAL_STORAGE_PREFIX = "BOOKSTORE_WEBSITE_";

// COLURS FOR DIFFERENT GENRES
const SCIENCE_FICTION_COLOURS = { primary: "#E6F2FF", secondary: "#001F3F" };
const FANTASY_COLOURS = { primary: "#FCE5E3", secondary: "#cf352e" };
const DETECTIVE_FICTION_COLOURS = { primary: "#EEEEEE", secondary: "#b7410e" };

// Check if color theme is stored in local storage
const getColourTheme = getColourThemeLocalStorage();
getColourTheme
    ? setColourTheme(getColourTheme, 0) //if stored in local storage, set the colors
    : setColourTheme("science-fiction", 0); // Default color theme

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.remove("bg-primary", "navbar-white", "opacity-95");
        navbar.classList.add("bg-secondary", "navbar-dark", "opacity-100");
        // searchButton?.classList.remove("btn-secondary");
        // searchButton?.classList.add("btn-primary");
        cartButton.classList.remove(
            "bg-primary",
            "text-secondary",
            "opacity-95"
        );
        cartButton.classList.add("bg-secondary", "text-primary");
        cartBadge.classList.remove("bg-secondary", "text-primary");
        cartBadge.classList.add("bg-primary", "text-secondary");
    } else {
        navbar.classList.remove("bg-secondary", "navbar-dark");
        navbar.classList.add("bg-primary", "navbar-white", "opacity-95");
        // searchButton?.classList.remove("btn-primary");
        // searchButton?.classList.add("btn-secondary");
        cartButton.classList.remove("bg-secondary", "text-primary");
        cartButton.classList.add("bg-primary", "text-secondary");
        cartBadge.classList.remove("bg-primary", "text-secondary");
        cartBadge.classList.add("bg-secondary", "text-primary");
    }
});

function getColourThemeLocalStorage() {
    const colourTheme = localStorage.getItem(
        LOCAL_STORAGE_PREFIX + "color-theme"
    );

    return colourTheme;
}

function setColourTheme(colourTheme) {
    let colourPrimary = "";
    let colourSecondary = "";

    if (colourTheme === "science-fiction") {
        colourPrimary = SCIENCE_FICTION_COLOURS.primary;
        colourSecondary = SCIENCE_FICTION_COLOURS.secondary;
    } else if (colourTheme === "fantasy") {
        colourPrimary = FANTASY_COLOURS.primary;
        colourSecondary = FANTASY_COLOURS.secondary;
    } else if (colourTheme === "detective-fiction") {
        colourPrimary = DETECTIVE_FICTION_COLOURS.primary;
        colourSecondary = DETECTIVE_FICTION_COLOURS.secondary;
    }

    // Delay the change for 2 seconds

    document.documentElement.style.setProperty(
        "--primary-color",
        colourPrimary
    );
    document.documentElement.style.setProperty(
        "--secondary-color",
        colourSecondary
    );
}

searchButtonNavigation.addEventListener("click", () => {
    console.log("search button clicked");
    const searchInput = document.querySelector(".search-nav-input");
    const searchQuery = searchInput.value;

    saveToSessionStorage("search-query", searchQuery);

    // window.location.href = "index.html";
});
