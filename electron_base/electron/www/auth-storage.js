const KEY = 'auth';

const browserStorage = {
    async load() {
        const raw = sessionStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    },
    async save(tokens) {
        sessionStorage.setItem(KEY, JSON.stringify(tokens));
    },
    async clear() {
        sessionStorage.removeItem(KEY);
    },
};

export const auth = window.authStorage || browserStorage;
