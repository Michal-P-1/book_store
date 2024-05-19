// DOM ELEMENTS
const currentColorTheme = document.querySelector("[data-color-theme]");
const carouselLeftButton = document.querySelector("#carousel-left-button");
const carouselRightButton = document.querySelector("#carousel-right-button");
const header = document.querySelector("header");
const navbar = document.querySelector("#navbar");
const searchButton = document.querySelector(".search-btn");
const cartButton = document.querySelector("#cart-button");
const cartBadge = document.querySelector("#cart-quantity-badge");
const contactButton = document.querySelector("#contact-link");

// COLURS FOR DIFFERENT GENRES
const SCIENCE_FICTION_COLOURS = { primary: "#E6F2FF", secondary: "#001F3F" };
const FANTASY_COLOURS = { primary: "#FCE5E3", secondary: "#cf352e" };
const DETECTIVE_FICTION_COLOURS = { primary: "#EEEEEE", secondary: "#b7410e" };

// IMAGES FOR DIFFERENT GENRES
const SCIENCE_FICTION_IMAGE = "./images/hero-images/science-fiction_4.jpg";
const FANTASY_IMAGE = "./images/hero-images/fantasy.jpg";
const DETECTIVE_FICTION_IMAGE = "./images/hero-images/detective.jpg";

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
    resetPagination();
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
    resetPagination();
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

    header.style.setProperty(
        "background-image",
        `url(${headerBackgroundImage})`
    );

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

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.remove("bg-primary", "navbar-white", "opacity-95");
        navbar.classList.add("bg-secondary", "navbar-dark", "opacity-100");
        searchButton.classList.remove("btn-secondary");
        searchButton.classList.add("btn-primary");
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
        searchButton.classList.remove("btn-primary");
        searchButton.classList.add("btn-secondary");
        cartButton.classList.remove("bg-secondary", "text-primary");
        cartButton.classList.add("bg-primary", "text-secondary");
        cartBadge.classList.remove("bg-primary", "text-secondary");
        cartBadge.classList.add("bg-secondary", "text-primary");
    }
});

// --------- BOOKS LOGIC JS ------------

// || RECOMEDED BOOKS JS ||
const currentShelfId = getRecommendedBooksShelfId();
fetchRecommendedBooksData(currentShelfId);

const recommendedBooksContainer = document.querySelector(
    "#recommended-books-inner-carousel"
);
const recommendedBooksTemplate = document.querySelector(
    "#recommended-books-card-template"
);
const expandSideBarBtn = document.querySelector("#expand-sidebar-btn");

async function fetchRecommendedBooksData(shelfId) {
    // Reset the container
    // recommendedBooksContainer.innerHTML = "";
    const spinner = document.querySelector(
        ".recommended-spinner-border-container"
    );
    // Show spinner while fetching data
    spinner.classList.remove("visually-hidden");

    const response = await fetch(
        `https://www.googleapis.com/books/v1/users/101352676981191392501/bookshelves/${shelfId}/volumes?maxResults=4`,
        { method: "GET" }
    );

    const recommendedBooks = await response.json();
    // Hide spinner after fetching data
    spinner.classList.add("visually-hidden");

    displayRecommendedBooks(recommendedBooks.items);
}

function displayRecommendedBooks(booksData) {
    let index = 0;
    // Reset the container
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
        bookCardImg.dataset.recommendedBookImg =
            book.volumeInfo.imageLinks.thumbnail;
        bookCardTitle.textContent = book.volumeInfo.title;
        bookCardTitle.dataset.recommendedBookTitle = book.volumeInfo.title;
        bookCardAuthor.textContent = book.volumeInfo.authors;
        bookCardCategory.textContent = book.volumeInfo.categories;
        const price = book.saleInfo?.listPrice?.amount || "8.99";
        bookCardPrice.textContent = `£${price}`;
        bookCardPrice.dataset.recommendedBookPrice = price;

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
const NUMBER_OF_BOOKS_PER_PAGE = 12;

function updateGenresBooksTitleAndSidebar(searchQuery) {
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
    // Initial sidebar active button
    if (genreName) {
        // Check if there is an active sidebar button
        const activeSidebarButton = document.querySelector(
            ".sidebar-container-menu .active"
        );
        // If there is an active sidebar button, remove the active class
        if (activeSidebarButton) {
            activeSidebarButton.classList.remove("active");
        }
        // Add the active class to the sidebar button based on the initial genre
        const initialActiveSidebarButton = document.querySelector(
            `[data-genre='${genreName}']`
        );
        if (initialActiveSidebarButton) {
            initialActiveSidebarButton.classList.add("active");
        }
    }
}

const initialGenresBookTitleUpdate = updateGenresBooksTitleAndSidebar();

async function fetchAllBooksData(startIndexValue = 0, searchCategory = "") {
    const searchQuery = searchCategory || currentColorTheme.dataset.colorTheme;
    const spinner = document.querySelector(".genres-spinner-border-container");
    const allBooksContainer = document.querySelector(".genre-books-container");

    allBooksContainer.innerHTML = "";

    try {
        // Show spinner while fetching data
        spinner.classList.remove("visually-hidden");
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q={${searchQuery}}&startIndex=${startIndexValue}&maxResults=${NUMBER_OF_BOOKS_PER_PAGE}&printType=books`,
            { method: "GET" }
        );

        const allBooks = await response.json();
        // Hide spinner after fetching data
        spinner.classList.add("visually-hidden");
        // Update the title of the genres books
        updateGenresBooksTitleAndSidebar(searchQuery);
        displayAllBooks(allBooks.items);
        return allBooks;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function displayAllBooks(booksData) {
    const allBooksContainer = document.querySelector(".genre-books-container");
    const allBooksTemplate = document.querySelector(
        "#genre-books-card-template"
    );
    // allBooksContainer.innerHTML = "";

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
        const bookCardId = allBookCardTemplateCopy.querySelector(
            "[data-genre-book-id]"
        );

        // If the book has no image, set a default image
        bookCardImg.src = book?.volumeInfo?.imageLinks?.thumbnail || "";
        if (bookCardImg.src === "") {
            bookCardImg.src = "./images/Icons/book_placeholder.png";
        }
        bookCardImg.dataset.genreBookImg = bookCardImg.src;

        bookCardTitle.textContent = book.volumeInfo.title;
        bookCardTitle.dataset.genreBookTitle = book.volumeInfo.title;
        bookCardAuthor.textContent = book.volumeInfo.authors;
        bookCardCategory.textContent = book.volumeInfo.categories;
        const price = book.saleInfo?.listPrice?.amount || "8.99";
        bookCardPrice.textContent = `£${price}`;
        bookCardPrice.dataset.genreBookPrice = price;
        bookCardId.dataset.genreBookId = book.id;

        allBooksContainer.appendChild(allBookCardTemplateCopy);
    });
}
// Initial fetch
const initialFetch = fetchAllBooksData();

// Seach button fetch data
searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const allBooksSection = document.querySelector(".genres-books-section");
    const searchInput = document.querySelector(".search-input");

    allBooksSection.scrollIntoView({ behavior: "smooth" });

    fetchAllBooksData(0, searchInput.value);

    // Reset search input
    searchInput.value = "";

    resetPagination();
});

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

// Sidebar button click event
window.addEventListener("click", async (event) => {
    const target = event.target.closest(".sidebar-btn");

    if (target) {
        const activeSidebarElement = document.querySelector(
            ".sidebar-container-menu .active"
        );
        if (activeSidebarElement) {
            activeSidebarElement.classList.remove("active");
        } else {
            target.classList.add("active");
        }

        const searchCategory = target.dataset.genre;
        const response = await fetchAllBooksData(0, searchCategory);
        if (!response) {
            console.error("Failed to fetch data.");
            // If failed to fetch data, disable the next button
            paginationButtonNext.parentElement.classList.add("disabled");
        }
        resetPagination();
    }
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

function updatePaginationButtonsNumbers(lastNumber) {
    lastNumber++;
    paginationButtonFirst.dataset.paginationNumber = lastNumber - 2;
    paginationButtonMiddle.dataset.paginationNumber = lastNumber - 1;
    paginationButtonLast.dataset.paginationNumber = lastNumber;

    paginationButtonFirst.textContent =
        Number(paginationButtonFirst.dataset.paginationNumber) + 1;
    paginationButtonMiddle.textContent =
        Number(paginationButtonMiddle.dataset.paginationNumber) + 1;
    paginationButtonLast.textContent =
        Number(paginationButtonLast.dataset.paginationNumber) + 1;
}

// Update the pagination buttons next and previous
async function updatePaginationButtons(paginationEnd) {
    const activePaginationElement = document.querySelector(".page-item.active");
    const activePaginationButton = activePaginationElement.querySelector("a");
    let activePaginationNumber = Number(
        activePaginationButton.dataset.paginationNumber
    );

    // If the active button is not the last button
    if (activePaginationButton.dataset.pagination !== paginationEnd) {
        activePaginationElement.classList.remove("active");
        if (paginationEnd === "end") {
            activePaginationNumber++;
            // Remove the disabled class from the previous button
            paginationButtonPrevious.parentElement.classList.remove("disabled");
            // Add the active class to the next button
            activePaginationElement.nextElementSibling.classList.add("active");
        } else if (paginationEnd === "start") {
            activePaginationNumber--;
            // Remove the disabled class from the next button
            paginationButtonNext.parentElement.classList.remove("disabled");
            activePaginationElement.previousElementSibling.classList.add(
                "active"
            );
        }
    } else {
        updatePaginationButtonsNumbers(activePaginationNumber);
        if (paginationEnd === "end") {
            activePaginationNumber++;
        } else if (paginationEnd === "start") {
            activePaginationNumber--;
        }
    }

    // Disable the previous button if the first value is reached
    if (activePaginationNumber === 0) {
        paginationButtonPrevious.parentElement.classList.add("disabled");
    }

    const response = await fetchAllBooksData(
        activePaginationNumber * NUMBER_OF_BOOKS_PER_PAGE
    );

    if (!response) {
        console.error("Failed to fetch data.");
        // If failed to fetch data, disable the next button
        paginationButtonNext.parentElement.classList.add("disabled");
    }
}

paginationButtonNext.addEventListener("click", async () => {
    updatePaginationButtons("end");
});

paginationButtonPrevious.addEventListener("click", async () => {
    updatePaginationButtons("start");
});

// Update pagination on click
window.addEventListener("click", async (event) => {
    const target = event.target;
    const activePaginationElement = document.querySelector(".page-item.active");

    // Remove the disabled class from the next and previous button
    if (
        target.dataset.pagination === "middle" ||
        target.dataset.pagination === "end"
    ) {
        paginationButtonPrevious.parentElement.classList.remove("disabled");
    } else if (
        target.dataset.pagination === "start" ||
        target.dataset.pagination === "middle"
    ) {
        paginationButtonNext.parentElement.classList.remove("disabled");
    }

    if (target.dataset.pagination) {
        const clickedPaginationElement = target;
        activePaginationElement.classList.remove("active");
        clickedPaginationElement.parentElement.classList.add("active");

        const clickedPaginationNumber = Number(target.dataset.paginationNumber);
        const response = await fetchAllBooksData(
            clickedPaginationNumber * NUMBER_OF_BOOKS_PER_PAGE
        );

        if (!response) {
            console.error("Failed to fetch data.");
            // If failed to fetch data, disable the next button
            paginationButtonNext.parentElement.classList.add("disabled");
        }
    }
});

function resetPagination() {
    const activePaginationElement = document.querySelector(".page-item.active");
    const previousPaginationElement = document.querySelector(
        ".pagination-previous-element "
    );
    const firstPaginationButton = document.querySelector(
        "[data-pagination=start]"
    );
    const secondPaginationButton = document.querySelector(
        "[data-pagination=middle]"
    );
    const thirdPaginationButton = document.querySelector(
        "[data-pagination=end]"
    );
    previousPaginationElement.classList.add("disabled");

    firstPaginationButton.dataset.paginationNumber = 0;
    firstPaginationButton.textContent = 1;
    secondPaginationButton.dataset.paginationNumber = 1;
    secondPaginationButton.textContent = 2;
    thirdPaginationButton.dataset.paginationNumber = 2;
    thirdPaginationButton.textContent = 3;

    activePaginationElement.classList.remove("active");
    firstPaginationButton.parentElement.classList.add("active");
}
