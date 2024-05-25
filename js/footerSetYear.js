function setCurrentYear() {
    const currentYearElemennt = document.querySelector(".current-year");

    currentYearElemennt.textContent = new Date().getFullYear();
}

setCurrentYear();
