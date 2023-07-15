export {};

declare global {
    interface Window {
        datastore: {
            getProducts(): Array<any>,
            getProperties(): Array<any>,
        };
    }
}