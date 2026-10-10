import { data, setStartupError, set_authenticated, tokens, saveTokens, clearTokens } from '../conf/state.js';
import { apiRequest, authenticatedRequest } from '../conf/api.js';
import { redirect, render } from '../conf/render.js';

export function normalizeUser(profile) {
    const user = { ...(profile && typeof profile === 'object' ? profile : {}) };
    const first = String(user.first_name || '').trim();
    const last = String(user.last_name || '').trim();
    const username = String(user.username || '').trim();

    const base = first || username || '?';
    const second = last || (first ? '' : username.slice(1));
    user.initial = (base.charAt(0) || '?').toUpperCase();
    user.initials = `${base.charAt(0)}${second ? second.charAt(0) : ''}`.toUpperCase() || '?';
    user.display_name = [first, last].filter(Boolean).join(' ') || username;

    user.date_joined_label = '';
    if (user.date_joined) {
        const d = new Date(user.date_joined);
        user.date_joined_label = Number.isNaN(d.getTime()) ? String(user.date_joined) : d.toLocaleDateString('ru-RU');
    }
    return user;
}

export async function loadProfile() {
    return normalizeUser(await authenticatedRequest('/profile/'));
}

export async function login(username, password) {
    const result = await apiRequest('/login/', {
        method: 'POST',
        body: { username, password },
    });
    await saveTokens({ access: result.access, refresh: result.refresh });
    data.user = await loadProfile();
    set_authenticated(true);
    data.authenticated = true;
    setStartupError('');
}

export async function register(user) {
    await apiRequest('/register/', { method: 'POST', body: user });
    await login(user.username, user.password);
}

export async function logout() {
    const refresh = tokens?.refresh;
    if (refresh) {
        try {
            await apiRequest('/logout/', { method: 'POST', body: { refresh_token: refresh } }, tokens?.access || '');
        } catch {}
    }
    await clearTokens();
    set_authenticated(false);
    data.authenticated = false;
    data.user = {};
    redirect('/login');
}

export function toggleEditProfile() {
    data.editProfile = !data.editProfile;
    render(true);
}

export async function saveProfile(fields) {
    data.user = normalizeUser(await authenticatedRequest('/profile/', { method: 'PUT', body: fields }));
    data.editProfile = false;
    render(true);
}
