const loaders = {};
const loaded = new Set();

export function registerLoader(path, fn) {
    loaders[path] = fn;
}

export function getLoader(path) {
    return loaders[path];
}

export function isLoaded(key) {
    return loaded.has(key);
}

export function markLoaded(key) {
    loaded.add(key);
}

export function invalidate() {
    loaded.clear();
}
