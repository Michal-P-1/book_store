const LOCAL_STORAGE_PREFIX = "BOOKSTORE_WEBSITE_";

export function saveToSessionStorage(storageItemKey, storageItemValue) {
    sessionStorage.setItem(
        LOCAL_STORAGE_PREFIX + storageItemKey,
        JSON.stringify(storageItemValue)
    );
}

export function getFromSessionStorage(storageItemKey) {
    return JSON.parse(
        sessionStorage.getItem(LOCAL_STORAGE_PREFIX + storageItemKey)
    );
}
