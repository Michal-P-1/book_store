const contactForm = document.querySelector(".contact-form");
const contactFormButton = document.querySelector(".contact-form-btn");
const contactFormInputs = contactForm.querySelectorAll(".form-control");

contactFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    let error = false;
    contactFormInputs.forEach((input) => {
        if (input.value === "") {
            error = true;
        }
    });

    if (!error) {
        alert(
            "Thank you for your message! We will get back to you as soon as possible."
        );
        contactForm.submit();
    } else {
        alert("Please fill in all fields.");
    }
});
