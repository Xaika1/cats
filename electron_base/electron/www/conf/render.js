import { routes, titles, PUBLIC_ROUTES, resolveTemplate, normalizePath } from './routing.js';
import { data, authReady, startupError, authenticated } from './state.js';
import { getLoader, isLoaded, markLoaded } from './loaders.js';

let lastRender = '';
let pendingRender = 0;
const afterRender = [];

export function onAfterRender(fn) {
    afterRender.push(fn);
}

function rehydrateScripts(root) {
    root.querySelectorAll('script').forEach((old) => {
        const next = document.createElement('script');
        for (const attr of [...old.attributes]) next.setAttribute(attr.name, attr.value);
        next.textContent = old.textContent;
        old.replaceWith(next);
    });
}

function disposeOverlays(root) {
    const B = window.bootstrap;
    if (B) {
        root.querySelectorAll('.modal').forEach((el) => B.Modal.getInstance(el)?.dispose());
        root.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => B.Tooltip.getInstance(el)?.dispose());
    }
    document.querySelectorAll('.tooltip').forEach((el) => el.remove());
}

function getCurrentPath() {
    if (location.hash.startsWith('#/')) return location.hash.slice(1);
    return '/';
}

export function render(force = false) {
    if (pendingRender) {
        cancelAnimationFrame(pendingRender);
        pendingRender = 0;
    }
    if (!authReady) return;

    const rawPath = getCurrentPath();
    const queryAt = rawPath.indexOf('?');
    const path = normalizePath(queryAt === -1 ? rawPath : rawPath.slice(0, queryAt));
    const params = queryAt === -1 ? {} : Object.fromEntries(new URLSearchParams(rawPath.slice(queryAt + 1)));
    const isPublic = PUBLIC_ROUTES.includes(path);

    if (!authenticated && !isPublic) {
        redirect('/login');
        return;
    }
    if (authenticated && isPublic) {
        redirect('/');
        return;
    }
    if (!location.hash.startsWith('#/')) {
        location.hash = '#/';
        return;
    }
    if (!routes[path]) {
        redirect('/');
        return;
    }

    const key = `${rawPath}|${authenticated ? 1 : 0}`;
    if (!force && key === lastRender) return;
    lastRender = key;

    data.params = params;
    data.route = path;

    const loader = getLoader(path);
    if (loader && !isLoaded(rawPath)) {
        markLoaded(rawPath);
        data.loadError = '';
        loader(params)
            .then(() => render(true))
            .catch((error) => {
                data.loadError = error?.message || String(error);
                render(true);
            });
        return;
    }

    data.title = titles[path] || data.appName;
    if (path === '/cats' && params.id && data.cat?.cat_name) data.title = data.cat.cat_name;
    document.title = `${data.title} — ${data.appName}`;

    const root = document.getElementById('root');
    disposeOverlays(root);
    root.innerHTML = window.renderPage(resolveTemplate(path, params), data);
    rehydrateScripts(root);

    if (window.bootstrap) {
        root.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new window.bootstrap.Tooltip(el));
    }

    if (isPublic && path === '/login' && startupError) {
        const alert = root.querySelector('#nonFieldAlert');
        const text = root.querySelector('#nonFieldText');
        if (alert && text) {
            text.textContent = startupError;
            alert.classList.remove('d-none');
            alert.classList.add('d-flex');
        }
    }

    afterRender.forEach((fn) => fn(root));
}

export function scheduleRender() {
    if (pendingRender) return;
    pendingRender = requestAnimationFrame(() => {
        pendingRender = 0;
        render();
    });
}

export function redirect(path) {
    const target = `#${path.startsWith('/') ? path : `/${path}`}`;
    lastRender = '';
    if (location.hash === target) render(true);
    else location.hash = target;
}
