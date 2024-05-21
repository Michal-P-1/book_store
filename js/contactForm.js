const contactForm = document.querySelector(".contact-form");
const contactFormButton = document.querySelector(".contact-form-btn");
const contactFormInputs = contactForm.querySelectorAll(".form-control");

contactFormButton.addEventListener("click", () => {
    contactForm.reset();
});
