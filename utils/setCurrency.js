const currency = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
});

export function setCurrency(price) {
    return currency.format(price);
}
