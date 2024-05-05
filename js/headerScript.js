// DOM ELEMENTS
const currentColorTheme = document.querySelector("[data-color-theme]");
const carouselLeftButton = document.querySelector("#carousel-left-button");
const carouselRightButton = document.querySelector("#carousel-right-button");
const header = document.querySelector("header");
const navbar = document.querySelector("#navbar");

// COLURS FOR DIFFERENT GENRES
const SCIENCE_FICTION_COLOURS = { primary: "#E6F2FF", secondary: "#001F3F" };
const FANTASY_COLOURS = { primary: "#FCE5E3", secondary: "#cf352e" };
const DETECTIVE_FICTION_COLOURS = { primary: "#EEEEEE", secondary: "#b7410e" };

// IMAGES FOR DIFFERENT GENRES
const SCIENCE_FICTION_IMAGE =
    "url('../images/hero-images/science-fiction_4.jpg')";
const FANTASY_IMAGE = "url('../images/hero-images/fantasy.jpg')";
const DETECTIVE_FICTION_IMAGE = "url('../images/hero-images/detective.jpg')";

// TEXT FOR DIFFERENT GENRES
const SCIENCE_FICTION_TEXT = "Science Fiction";
const FANTASY_TEXT = "Fantasy";
const DETECTIVE_FICTION_TEXT = "Detective Fiction";

// LOCAL STORAGE PREFIX
const LOCAL_STORAGE_PREFIX = "BOOKSTORE_WEBSITE_";
const CHANGE_THEME_TIME = 3000;

// GOOGLE BOOKS API IDS
const SCIENCE_FICTION_SHELF_ID = 1001;
const FANTASY_SHELF_ID = 1002;
const DETECTIVE_FICTION_SHELF_ID = 1003;

// ------ HEADER CAROUSEL JS ---------
// Carousel left button
carouselLeftButton.addEventListener("click", () => {
    changeHeaderBackgroundEffect();
    if (currentColorTheme.dataset.colorTheme === "science-fiction") {
        setColourTheme("crime", CHANGE_THEME_TIME / 2);
    } else if (currentColorTheme.dataset.colorTheme === "crime") {
        setColourTheme("fantasy", CHANGE_THEME_TIME / 2);
    } else if (currentColorTheme.dataset.colorTheme === "fantasy") {
        setColourTheme("science-fiction", CHANGE_THEME_TIME / 2);
    }

    saveColourThemeLocalStorage(currentColorTheme.dataset.colorTheme);
    disableCarouselButtonsTime(CHANGE_THEME_TIME + 1000);
    console.log(getRecommendedBooksShelfId());
    fetchRecommendedBooksData(getRecommendedBooksShelfId());
});

// Carousel - right button
carouselRightButton.addEventListener("click", () => {
    changeHeaderBackgroundEffect();
    if (currentColorTheme.dataset.colorTheme === "science-fiction") {
        setColourTheme("crime", CHANGE_THEME_TIME / 2);
    } else if (currentColorTheme.dataset.colorTheme === "crime") {
        setColourTheme("fantasy", CHANGE_THEME_TIME / 2);
    } else if (currentColorTheme.dataset.colorTheme === "fantasy") {
        setColourTheme("science-fiction", CHANGE_THEME_TIME / 2);
    }

    saveColourThemeLocalStorage(currentColorTheme.dataset.colorTheme);
    disableCarouselButtonsTime(CHANGE_THEME_TIME + 1000);
    console.log(getRecommendedBooksShelfId());
    fetchRecommendedBooksData(getRecommendedBooksShelfId());
});

const setColourTheme = (colourTheme, delay) => {
    currentColorTheme.dataset.colorTheme = colourTheme;
    let colourPrimary = "";
    let colourSecondary = "";
    let headerBackgroundImage = "";
    let themeName = "";

    if (colourTheme === "science-fiction") {
        colourPrimary = SCIENCE_FICTION_COLOURS.primary;
        colourSecondary = SCIENCE_FICTION_COLOURS.secondary;
        headerBackgroundImage = SCIENCE_FICTION_IMAGE;
        themeName = SCIENCE_FICTION_TEXT;
    } else if (colourTheme === "fantasy") {
        colourPrimary = FANTASY_COLOURS.primary;
        colourSecondary = FANTASY_COLOURS.secondary;
        headerBackgroundImage = FANTASY_IMAGE;
        themeName = FANTASY_TEXT;
    } else if (colourTheme === "crime") {
        colourPrimary = DETECTIVE_FICTION_COLOURS.primary;
        colourSecondary = DETECTIVE_FICTION_COLOURS.secondary;
        headerBackgroundImage = DETECTIVE_FICTION_IMAGE;
        themeName = DETECTIVE_FICTION_TEXT;
    }

    header.style.setProperty("background-image", headerBackgroundImage);

    // Delay the change for 2 seconds
    setTimeout(function () {
        // Set the new theme name after 2 seconds
        header.querySelector("[data-color-theme]").textContent = themeName;
        document.documentElement.style.setProperty(
            "--primary-color",
            colourPrimary
        );
        document.documentElement.style.setProperty(
            "--secondary-color",
            colourSecondary
        );
    }, delay);
};

const saveColourThemeLocalStorage = (colorTheme) => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + "color-theme", colorTheme);
};

const getColourThemeLocalStorage = () => {
    const colourTheme = localStorage.getItem(
        LOCAL_STORAGE_PREFIX + "color-theme"
    );

    return colourTheme;
};

function disableCarouselButtonsTime(time) {
    carouselLeftButton.disabled = true;
    carouselRightButton.disabled = true;
    setTimeout(function () {
        carouselLeftButton.disabled = false;
        carouselRightButton.disabled = false;
    }, time);
}

function changeHeaderBackgroundEffect() {
    const textElement = header.querySelector("[data-color-theme]");

    textElement.classList.add("changing");
    navbar.classList.add("changing");
    setTimeout(function () {
        textElement.classList.remove("changing");
        navbar.classList.remove("changing");
    }, CHANGE_THEME_TIME / 2);

    header.style.setProperty(
        "transition",
        `background-image ${CHANGE_THEME_TIME}ms ease-in-out`
    );
}

// Check if color theme is stored in local storage
const getColourTheme = getColourThemeLocalStorage();
getColourTheme
    ? setColourTheme(getColourTheme, 0) //if stored in local storage, set the colors
    : setColourTheme("science-fiction", 0); // Default color theme

// NAVBAR
const userScroll = () => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.remove("bg-primary", "navbar-white", "opacity-95");
            navbar.classList.add("bg-secondary", "navbar-dark", "opacity-100");
        } else {
            navbar.classList.remove(
                "bg-secondary",
                "navbar-dark",
                "opacity-100"
            );
            navbar.classList.add("bg-primary", "navbar-white", "opacity-95");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    userScroll();
});

// --------- BOOKS LOGIC JS ------------
// TODO: Figure out how to fetch books from the Google Books API
fetchRecommendedBooksData(getRecommendedBooksShelfId());

const bookCardImg = document.querySelector("[data-book-img]");
const bookCardTitle = document.querySelector("[data-book-title]");
const bookCardAuthor = document.querySelector("[data-book-author]");
const bookCardPublishedDate = document.querySelector(
    "[data-book-published-date]"
);
const bookCardCategory = document.querySelector("[data-book-category]");
console.log(bookCardImg);
const recommendedBooksContainer = document.querySelector(
    "[data-recommended-books]"
);
const recommendedBooksTemplate = document.querySelector(
    "#recommended-books-card-template"
);

async function fetchRecommendedBooksData(shelfId) {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/users/101352676981191392501/bookshelves/${shelfId}/volumes`,
        { method: "GET" }
    );

    const recommendedBooks = await response.json();

    displayRecommendedBooks(recommendedBooks.items);
}

function displayRecommendedBooks(booksData) {
    recommendedBooksContainer.innerHTML = "";

    booksData.forEach((book) => {
        const recommendedBookCardTemplateCopy =
            recommendedBooksTemplate.content.cloneNode(true);
        const bookCardImg =
            recommendedBookCardTemplateCopy.querySelector("[data-book-img]");
        const bookCardTitle =
            recommendedBookCardTemplateCopy.querySelector("[data-book-title]");
        const bookCardAuthor =
            recommendedBookCardTemplateCopy.querySelector("[data-book-author]");
        const bookCardPrice =
            recommendedBookCardTemplateCopy.querySelector("[data-book-price]");

        bookCardImg.src = book.volumeInfo.imageLinks.thumbnail;
        bookCardTitle.textContent = book.volumeInfo.title;
        bookCardAuthor.textContent = book.volumeInfo.authors;
        const price = book.saleInfo?.listPrice?.amount || "8.99";
        bookCardPrice.textContent = price;

        recommendedBooksContainer.appendChild(recommendedBookCardTemplateCopy);
    });
}

function getRecommendedBooksShelfId() {
    let shelfId = 0;

    if (currentColorTheme.dataset.colorTheme === "science-fiction") {
        shelfId = SCIENCE_FICTION_SHELF_ID;
    } else if (currentColorTheme.dataset.colorTheme === "fantasy") {
        shelfId = FANTASY_SHELF_ID;
    } else if (currentColorTheme.dataset.colorTheme === "crime") {
        shelfId = DETECTIVE_FICTION_SHELF_ID;
    }

    return shelfId;
}

async function fetchAllBooksData() {
    const searchCategory = "";
    const searchQuery = searchCategory || currentColorTheme.dataset.colorTheme;
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q={${searchQuery}}&maxResults=20&printType=books`,
        { method: "GET" }
    );
    // Address to my recommendations
    // `https://www.googleapis.com/books/v1/users/101352676981191392501/bookshelves/1001/volumes`,
    // { method: "GET" }

    const books = await response.json();
    console.log(books);
    console.log(books.items[0].volumeInfo);
    console.log(books.items[0].volumeInfo.title);
    console.log(books.items[0].volumeInfo.authors);
    // console.log(books.items[0].saleInfo.listPrice.amount);
    console.log(books.items[0].volumeInfo.imageLinks.thumbnail);

    bookCardImg.src = books.items[0].volumeInfo.imageLinks.thumbnail;
    bookCardAuthor.textContent = books.items[0].volumeInfo.authors;
    bookCardTitle.textContent = books.items[0].volumeInfo.title;

    const price = books.items[0]?.saleInfo?.listPrice?.amount || "8.99";
    bookCardPublishedDate.textContent = price;
}

fetchAllBooksData();
