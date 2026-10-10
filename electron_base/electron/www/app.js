import { API_BASE } from './conf/conf.js';
import { render, scheduleRender, redirect } from './conf/render.js';
import { data, markAuthReady, setStartupError, set_authenticated, tokens, setTokens, readTokens, clearTokens } from './conf/state.js';
import { loadProfile, login, register, logout, toggleEditProfile, saveProfile } from './views/auth.js';
import * as cats from './views/cats.js';

function toast(message, kind = 'success') {
    const host = document.getElementById('toastHost');
    if (!host || !window.bootstrap) return;
    const icons = { success: 'bi-check-circle-fill', danger: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    const el = document.createElement('div');
    el.className = `toast align-items-center border-0 toast-${kind}`;
    el.setAttribute('role', 'status');
    el.innerHTML = `<div class="d-flex"><div class="toast-body d-flex align-items-center gap-2">
        <i class="bi ${icons[kind] || icons.info}"></i><span></span></div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Закрыть"></button></div>`;
    el.querySelector('span').textContent = message;
    host.appendChild(el);
    el.addEventListener('hidden.bs.toast', () => el.remove());
    new window.bootstrap.Toast(el, { delay: 2800 }).show();
}

function confirmDialog(text, okLabel = 'Удалить') {
    const el = document.getElementById('confirmModal');
    if (!el || !window.bootstrap) return Promise.resolve(window.confirm(text));
    document.getElementById('confirmModalBody').textContent = text;
    const ok = document.getElementById('confirmModalOk');
    ok.textContent = okLabel;
    const modal = window.bootstrap.Modal.getOrCreateInstance(el);
    return new Promise((resolve) => {
        let result = false;
        const onOk = () => {
            result = true;
            modal.hide();
        };
        ok.addEventListener('click', onOk, { once: true });
        el.addEventListener('hidden.bs.modal', () => {
            ok.removeEventListener('click', onOk);
            resolve(result);
        }, { once: true });
        modal.show();
    });
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-logout]')) return;
    event.preventDefault();
    logout();
});

async function initialize() {
    try {
        setTokens(await readTokens());
        if (tokens?.access) {
            data.user = await loadProfile();
            set_authenticated(true);
            data.authenticated = true;
        }
    } catch (error) {
        if (error.status === 401) {
            await clearTokens();
            set_authenticated(false);
        } else {
            setStartupError(error.message);
        }
    }

    markAuthReady();
    render(true);
}

window.ui = { toast, confirm: confirmDialog };
window.taskflowAuth = { login, register, logout, toggleEditProfile, saveProfile };
window.taskflowCats = cats;
window.navigate = (path) => redirect(path.startsWith('/') ? path : `/${path}`);
window.__debug = { getData: () => data, getApiBase: () => API_BASE };

window.addEventListener('hashchange', scheduleRender);

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initialize, { once: true });
} else {
    initialize();
}
