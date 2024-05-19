const shoppingCartButton = document.querySelector("#cart-button");
const shoppingCartSummarySection = document.querySelector(
    "#cart-summary-section"
);
const shoppingCartSummary = document.querySelector("#cart-summary-container");
const removeBookFromShoppingCartButton = document.querySelector(
    "[data-cart-book-remove]"
);
const cartTotalElement = document.querySelector("[data-cart-total]");
const shoppingCartTotalTitle = document.querySelector(".cart-total-title");

const shoppingCartBooks = [];

shoppingCartButton.addEventListener("click", () => {
    if (shoppingCartSummarySection.classList.contains("visually-hidden")) {
        console.log("hidden");
    }
    shoppingCartButton.classList.toggle("active-btn");
    shoppingCartSummarySection.classList.toggle("visually-hidden");
    shoppingCartSummarySection.classList.toggle("d-block");
});

// Add items to the shopping cart
window.addEventListener("click", (e) => {
    // console.log("Event listener");
    const target =
        e.target.closest("[data-recommended-book-button]") ||
        e.target.closest("[data-add-to-basket-book-button]");

    if (target) {
        const { bookId, bookImgUrl, bookTitle, bookPrice } = getCartBookData(
            target
        )
            ? target
            : {};
        displayCartBooks(shoppingCartBooks);
        calculateTotalPrice();
    }
});

// Modal for removing items from the shopping cart
window.addEventListener("click", (e) => {
    const target = e.target.closest(".shopping-summary-card");

    if (target) {
        const removeItemModal = target.querySelector(".remove-item-modal");
        const removeItemModalBackdrop = target.querySelector(
            ".remove-item-modal-backdrop"
        );

        removeItemModalBackdrop.classList.remove("visually-hidden");
        removeItemModal.classList.remove("visually-hidden");
    }
});

// Remove items from the shopping cart
window.addEventListener("click", (e) => {
    const target = e.target.closest(".remove-item-modal-btn-yes");
    if (target) {
        const targetParentElement = target.closest("[data-cart-book-id]");
        const bookId = targetParentElement.dataset.cartBookId;
        removeBookFromShoppingCart(bookId);
        displayCartBooks(shoppingCartBooks);
        calculateTotalPrice();
    }
});

function calculateTotalPrice() {
    let totalPrice = 0;

    shoppingCartBooks.forEach((book) => {
        totalPrice += parseFloat(book.bookPrice) * book.numberOfItems;
    });
    if (totalPrice === 0) {
        cartTotalElement.classList.add("visually-hidden");
        shoppingCartTotalTitle.classList.add("visually-hidden");
    } else {
        shoppingCartTotalTitle.classList.remove("visually-hidden");
        cartTotalElement.classList.remove("visually-hidden");
        cartTotalElement.textContent = "£" + totalPrice.toFixed(2);
    }
}

function removeBookFromShoppingCart(bookId) {
    shoppingCartBooks.forEach((book, index) => {
        if (book.bookId === bookId) {
            if (book.numberOfItems > 1) {
                book.numberOfItems--;
            } else {
                shoppingCartBooks.splice(index, 1);
            }
        }
    });
}

function getCartBookData(target) {
    // IDs are placed on the main elements
    const shoppingCartBookObject = {
        bookId: "",
        bookTitle: "",
        bookPrice: 0,
        bookImgUrl: "",
        numberOfItems: 0,
    };
    const targetMainElement =
        target?.closest("[data-genre-book-id]") ||
        target?.closest("[data-recommended-book-id]");

    const bookTitleElement =
        targetMainElement.querySelector("[data-book-title]") ||
        targetMainElement.querySelector("[data-recommended-book-title]");
    const bookImgElement =
        targetMainElement.querySelector("[data-book-img]") ||
        targetMainElement.querySelector("[data-recommended-book-img]");
    const bookPriceElement =
        targetMainElement.querySelector("[data-book-price]") ||
        targetMainElement.querySelector("[data-recommended-book-price]");

    const bookId =
        targetMainElement.dataset.genreBookId ||
        targetMainElement.dataset.recommendedBookId;
    const bookImgUrl =
        bookImgElement?.dataset.genreBookImg ||
        bookImgElement?.dataset.recommendedBookImg;
    const bookTitle =
        bookTitleElement?.dataset.genreBookTitle ||
        bookTitleElement?.dataset.recommendedBookTitle;
    const bookPrice =
        bookPriceElement.dataset.genreBookPrice ||
        bookPriceElement.dataset.recommendedBookPrice;

    shoppingCartBookObject.bookId = bookId;
    shoppingCartBookObject.bookTitle = bookTitle;
    shoppingCartBookObject.bookPrice = bookPrice;
    shoppingCartBookObject.bookImgUrl = bookImgUrl;

    if (!shoppingCartBooks.length) {
        shoppingCartBookObject.numberOfItems = 1;
        shoppingCartBooks.push(shoppingCartBookObject);
        return;
    }

    let bookExists = false;

    shoppingCartBooks.forEach((book) => {
        if (book.bookId === bookId) {
            book.numberOfItems++;
            shoppingCartBookObject.numberOfItems = book.numberOfItems;
            bookExists = true;
        }
    });

    if (!bookExists) {
        shoppingCartBookObject.numberOfItems = 1;
        shoppingCartBooks.push(shoppingCartBookObject);
    }

    return { bookId, bookImgUrl, bookTitle, bookPrice };
}

function displayCartBooks(cartBooks) {
    const cartBookTemplate = document.getElementById(
        "shopping-summary-card-template"
    );

    shoppingCartSummary.innerHTML = "";
    cartBooks.forEach((book) => {
        const cartBookTemplateClone = cartBookTemplate.content.cloneNode(true);

        const targetMainElement = cartBookTemplateClone.querySelector(
            "[data-cart-book-id]"
        );
        const cartBookImg = cartBookTemplateClone.querySelector(
            "[data-cart-book-img]"
        );
        const cartBookTitle = cartBookTemplateClone.querySelector(
            "[data-cart-book-title]"
        );
        const cartBookPrice = cartBookTemplateClone.querySelector(
            "[data-cart-book-price]"
        );
        const cartBookQuantity = cartBookTemplateClone.querySelector(
            "[data-cart-book-quantity]"
        );

        targetMainElement.dataset.cartBookId = book.bookId;
        cartBookPrice.dataset.cartBookPrice = book.bookPrice;

        cartBookImg.src = book.bookImgUrl;
        cartBookTitle.textContent = book.bookTitle;
        cartBookPrice.textContent = "£" + book.bookPrice;
        cartBookQuantity.textContent = book.numberOfItems;

        shoppingCartSummary.appendChild(cartBookTemplateClone);
    });
}
