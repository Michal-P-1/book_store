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

    const currentShelfId = getRecommendedBooksShelfId();
    fetchRecommendedBooksData(currentShelfId);
    fetchAllBooksData();
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
    const currentShelfId = getRecommendedBooksShelfId();
    fetchRecommendedBooksData(currentShelfId);
    fetchAllBooksData();
});

function setColourTheme(colourTheme, delay) {
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
}

function saveColourThemeLocalStorage(colorTheme) {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + "color-theme", colorTheme);
}

function getColourThemeLocalStorage() {
    const colourTheme = localStorage.getItem(
        LOCAL_STORAGE_PREFIX + "color-theme"
    );

    return colourTheme;
}

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
function userScroll() {
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
}

document.addEventListener("DOMContentLoaded", () => {
    userScroll();
});

// --------- BOOKS LOGIC JS ------------

// || RECOMEDED BOOKS JS ||
const currentShelfId = getRecommendedBooksShelfId();
fetchRecommendedBooksData(currentShelfId);

// const bookCardImg = document.querySelector("[data-book-img]");
// const bookCardTitle = document.querySelector("[data-book-title]");
// const bookCardAuthor = document.querySelector("[data-book-author]");
// const bookCardPublishedDate = document.querySelector(
//     "[data-book-published-date]"
// );
// const bookCardCategory = document.querySelector("[data-book-category]");
const recommendedBooksContainer = document.querySelector(
    "#recommended-books-inner-carousel"
);
const recommendedBooksTemplate = document.querySelector(
    "#recommended-books-card-template"
);
const expandSideBarBtn = document.querySelector("#expand-sidebar-btn");

async function fetchRecommendedBooksData(shelfId) {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/users/101352676981191392501/bookshelves/${shelfId}/volumes?maxResults=4`,
        { method: "GET" }
    );

    const recommendedBooks = await response.json();

    displayRecommendedBooks(recommendedBooks.items);
}

function displayRecommendedBooks(booksData) {
    let index = 0;
    // Resert the container
    recommendedBooksContainer.innerHTML = "";

    booksData.forEach((book) => {
        const recommendedBookCardTemplateCopy =
            recommendedBooksTemplate.content.cloneNode(true);

        const bookCardId = recommendedBookCardTemplateCopy.querySelector(
            "[data-recommended-book-id]"
        );
        const bookCardImg = recommendedBookCardTemplateCopy.querySelector(
            "[data-recommended-book-img]"
        );
        const bookCardTitle = recommendedBookCardTemplateCopy.querySelector(
            "[data-recommended-book-title]"
        );
        const bookCardAuthor = recommendedBookCardTemplateCopy.querySelector(
            "[data-recommended-book-author]"
        );
        const bookCardPrice = recommendedBookCardTemplateCopy.querySelector(
            "[data-recommended-book-price]"
        );
        const bookCardCategory = recommendedBookCardTemplateCopy.querySelector(
            "[data-recommended-book-category]"
        );
        // Class active must be added to one of the carousel items (bootstrap requirement)
        if (index === 0) {
            recommendedBookCardTemplateCopy
                .querySelector(".carousel-item")
                .classList.add("active");
        }

        bookCardId.dataset.recommendedBookId = book.id;
        bookCardImg.src = book.volumeInfo.imageLinks.thumbnail;
        bookCardTitle.textContent = book.volumeInfo.title;
        bookCardAuthor.textContent = book.volumeInfo.authors;
        bookCardCategory.textContent = book.volumeInfo.categories;
        const price = book.saleInfo?.listPrice?.amount || "8.99";
        bookCardPrice.textContent = `£${price}`;
        // bookCardPrice.dataset.recommendedBookPrice = price;

        recommendedBooksContainer.appendChild(recommendedBookCardTemplateCopy);

        index++;
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

// || GENRES BOOKS "ALL BOOKS" JS ||

function updateGenresBooksTitle(searchQuery) {
    const genresBooksTitle = document.querySelector(".genres-books-title");
    let genreName = "";

    // Update the title of the genres books
    if (searchQuery === "crime") {
        genreName = "Detective Fiction";
    } else if (searchQuery === "fantasy") {
        genreName = "Fantasy";
    } else if (searchQuery === "science-fiction") {
        genreName = "Science Fiction";
    } else {
        genreName = searchQuery;
    }

    genresBooksTitle.textContent = genreName;
}

updateGenresBooksTitle();
async function fetchAllBooksData(startIndexValue = 0) {
    const searchCategory = "";
    const searchQuery = searchCategory || currentColorTheme.dataset.colorTheme;
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q={${searchQuery}}&startIndex=${startIndexValue}&maxResults=12&printType=books`,
        { method: "GET" }
    );
    const allBooks = await response.json();

    // Update the title of the genres books
    updateGenresBooksTitle(searchQuery);
    displayAllBooks(allBooks.items);

    // console.log(books);
    // console.log(books.items[0].volumeInfo);
    // console.log(books.items[0].volumeInfo.title);
    // console.log(books.items[0].volumeInfo.authors);
    // // console.log(books.items[0].saleInfo.listPrice.amount);
    // console.log(books.items[0].volumeInfo.imageLinks.thumbnail);

    // bookCardImg.src = books.items[0].volumeInfo.imageLinks.thumbnail;
    // bookCardAuthor.textContent = books.items[0].volumeInfo.authors;
    // bookCardTitle.textContent = books.items[0].volumeInfo.title;

    // const price = books.items[0]?.saleInfo?.listPrice?.amount || "8.99";
    // bookCardPublishedDate.textContent = price;
}

function displayAllBooks(booksData) {
    const allBooksContainer = document.querySelector(".genre-books-container");
    const allBooksTemplate = document.querySelector(
        "#genre-books-card-template"
    );
    allBooksContainer.innerHTML = "";

    booksData.forEach((book) => {
        const allBookCardTemplateCopy =
            allBooksTemplate.content.cloneNode(true);

        const bookCardImg =
            allBookCardTemplateCopy.querySelector("[data-book-img]");
        const bookCardTitle =
            allBookCardTemplateCopy.querySelector("[data-book-title]");
        const bookCardAuthor =
            allBookCardTemplateCopy.querySelector("[data-book-author]");
        const bookCardPrice =
            allBookCardTemplateCopy.querySelector("[data-book-price]");
        const bookCardCategory = allBookCardTemplateCopy.querySelector(
            "[data-book-category]"
        );

        bookCardImg.src = book.volumeInfo.imageLinks.thumbnail;
        bookCardTitle.textContent = book.volumeInfo.title;
        bookCardAuthor.textContent = book.volumeInfo.authors;
        bookCardCategory.textContent = book.volumeInfo.categories;
        const price = book.saleInfo?.listPrice?.amount || "8.99";
        bookCardPrice.textContent = `£${price}`;

        allBooksContainer.appendChild(allBookCardTemplateCopy);
    });
}

fetchAllBooksData();

// || SIDE MENU ||
expandSideBarBtn.addEventListener("click", () => {
    const sideBarContainer = document.querySelector(".sidebar-container-menu");
    const sideBarTextElements = sideBarContainer.querySelectorAll(
        ".sidebar-genre-text"
    );
    const expandIconRight = document.querySelector(".expand-icon-right");
    const expandIconLeft = document.querySelector(".expand-icon-left");

    sideBarContainer.classList.toggle("sidebar-expanded");
    sideBarTextElements.forEach((sideBarText) => {
        sideBarText.classList.toggle("sidebar-genre-text-expanded");
        expandIconRight.classList.toggle("d-none");
        expandIconLeft.classList.toggle("d-none");
    });
});

// || PAGINATION

const paginationButtonPrevious = document.querySelector(
    "[data-pagination-previous]"
);
const paginationButtonNext = document.querySelector("[data-pagination-next]");
const paginationButtonFirst = document.querySelector("[data-pagination=start]");
const paginationButtonMiddle = document.querySelector(
    "[data-pagination=middle]"
);
const paginationButtonLast = document.querySelector("[data-pagination=end]");

function updatePaginationButtons(operation) {
    let paginationButtonNumberLast = Number(
        paginationButtonLast.dataset.paginationNumber
    );
    let paginationButtonNumberFirst = Number(
        paginationButtonFirst.dataset.paginationNumber
    );
    let activePaginationElement = document.querySelector(".page-item.active");
    let activePaginationButton =
        activePaginationElement.querySelector("button");

    let currentActivePaginationNumber = Number(
        activePaginationButton.dataset.paginationNumber
    );

    // Next button logic
    if (operation === "next") {
        // If the last button, add 1
        if (activePaginationButton.dataset.pagination === "end") {
            paginationButtonNumberLast++;
            paginationButtonLast.dataset.paginationNumber =
                paginationButtonNumberLast;
            paginationButtonLast.textContent =
                paginationButtonLast.dataset.paginationNumber;
            // else - if not the last button, add 1 to the active button
        } else {
            // Enable the previous button on next button click
            if (
                paginationButtonPrevious.parentElement.classList.contains(
                    "disabled"
                )
            ) {
                paginationButtonPrevious.parentElement.classList.remove(
                    "disabled"
                );
            }

            currentActivePaginationNumber++;
            activePaginationElement.classList.remove("active");
            activePaginationElement.nextElementSibling.classList.add("active");
        }
    }

    // Previous button logic
    if (
        operation === "previous" &&
        activePaginationButton.dataset.pagination !== "start"
    ) {
        if (paginationButtonNumberFirst > 1) {
            paginationButtonNumberLast--;
            paginationButtonLast.dataset.paginationNumber =
                paginationButtonNumberLast;
            paginationButtonLast.textContent = paginationButtonNumberLast;
        } else {
            currentActivePaginationNumber--;
            activePaginationElement.classList.remove("active");
            activePaginationElement.previousElementSibling.classList.add(
                "active"
            );
        }
    }

    paginationButtonFirst.dataset.paginationNumber =
        paginationButtonNumberLast - 2;
    paginationButtonMiddle.dataset.paginationNumber =
        paginationButtonNumberLast - 1;
    paginationButtonMiddle.textContent = paginationButtonNumberLast - 1;
    paginationButtonFirst.textContent = paginationButtonNumberLast - 2;

    // Disable the previous button if the first value is reached
    if (currentActivePaginationNumber === 1) {
        paginationButtonPrevious.parentElement.classList.add("disabled");
        return;
    }
}

paginationButtonNext.addEventListener("click", () => {
    updatePaginationButtons("next");
});

paginationButtonPrevious.addEventListener("click", () => {
    updatePaginationButtons("previous");
});
