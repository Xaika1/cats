import { auth } from '../auth-storage.js';

export const data = {
    appName: 'Котокафе',
    title: 'Котики',
    authenticated: false,
    user: {},
    params: {},
    cats: [],
    breeds: [],
    stats: {},
    cat: {},
    health: [],
    filters: { name: '', status: '', gender: '', breed: '', sort: 'name' },
    healthFilters: { status: '', date_from: '', date_to: '' },
    showCatForm: false,
    catFormId: null,
    catForm: {},
    healthFormId: null,
    weightChart: null,
    healthForm: {},
    editProfile: false,
    loadError: '',
    statusLabels: {},
    genderLabels: {},
};

export let authReady = false;
export let startupError = '';
export let authenticated = false;
export let tokens = null;

export function markAuthReady() {
    authReady = true;
}

export function setStartupError(message) {
    startupError = message;
}

export function set_authenticated(value) {
    authenticated = value;
}

export function setTokens(value) {
    tokens = value;
}

export async function readTokens() {
    return auth.load();
}

export async function saveTokens(value) {
    setTokens(value);
    await auth.save(value);
}

export async function clearTokens() {
    setTokens(null);
    await auth.clear();
}
