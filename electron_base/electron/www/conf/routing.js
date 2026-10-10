export const routes = {
    '/': 'cats.html',
    '/cats': 'cats.html',
    '/profile': 'profile.html',
    '/login': 'auth/login.html',
    '/register': 'auth/reg.html',
};

export const titles = {
    '/': 'Котики',
    '/cats': 'Котики',
    '/profile': 'Профиль',
    '/login': 'Вход',
    '/register': 'Регистрация',
};

export const PUBLIC_ROUTES = ['/login', '/register'];

export function normalizePath(path) {
    return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function resolveTemplate(path, params = {}) {
    if (path === '/cats' && params.id) return 'cat_detail.html';
    return routes[path];
}
