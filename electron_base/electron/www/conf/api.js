import { REQUEST_TIMEOUT_MS, API_BASE } from './conf.js';
import { data, set_authenticated, tokens, saveTokens, clearTokens } from './state.js';
import { redirect } from './render.js';

const FIELD_LABELS = {
    username: 'Имя пользователя',
    password: 'Пароль',
    password2: 'Повтор пароля',
    email: 'Email',
    cat_name: 'Кличка',
    cat_information: 'Описание',
    cat_url: 'Фото',
    breed: 'Порода',
    gender: 'Пол',
    age: 'Возраст',
    date: 'Дата',
    status: 'Статус',
    weight: 'Вес',
    note: 'Заметка',
};

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

function flattenMessages(value) {
    if (value === null || value === undefined) return [];
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value.flatMap(flattenMessages);
    if (typeof value === 'object') {
        return Object.entries(value).flatMap(([key, inner]) => {
            const label = FIELD_LABELS[key];
            return flattenMessages(inner).map((text) => (label ? `${label}: ${text}` : text));
        });
    }
    return [String(value)];
}

function withTimeout(signal) {
    const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
    if (!signal) return timeout;
    return typeof AbortSignal.any === 'function' ? AbortSignal.any([signal, timeout]) : timeout;
}

export async function apiRequest(path, options = {}, accessToken = '') {
    const headers = { ...options.headers };
    let body = options.body;

    if (body && !(body instanceof FormData) && typeof body !== 'string') {
        body = JSON.stringify(body);
    }
    if (body && !(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    let response;
    try {
        response = await fetch(API_BASE + path, {
            ...options,
            body,
            headers,
            signal: withTimeout(options.signal),
        });
    } catch (error) {
        if (error?.name === 'TimeoutError') {
            throw new ApiError(`Сервер ${API_BASE} не отвечает`, 0);
        }
        throw new ApiError(`Не удалось подключиться к серверу ${API_BASE}`, 0);
    }

    const payload = response.status === 204 || response.status === 205
        ? null
        : await response.json().catch(() => null);

    if (!response.ok) {
        const details = payload ? flattenMessages(payload).join(' ') : '';
        throw new ApiError(details || `Ошибка сервера (${response.status})`, response.status);
    }

    return payload;
}

async function refreshTokens() {
    if (!tokens?.refresh) throw new ApiError('Сессия завершена', 401);
    const refreshed = await apiRequest('/token/refresh/', {
        method: 'POST',
        body: { refresh: tokens.refresh },
    });
    await saveTokens({
        access: refreshed.access,
        refresh: refreshed.refresh || tokens.refresh,
    });
}

async function sessionExpired() {
    await clearTokens();
    set_authenticated(false);
    data.authenticated = false;
    data.user = {};
    redirect('/login');
}

export async function authenticatedRequest(path, options = {}) {
    try {
        return await apiRequest(path, options, tokens?.access || '');
    } catch (error) {
        if (error.status !== 401) throw error;
        if (tokens?.refresh) {
            try {
                await refreshTokens();
            } catch (refreshError) {
                await sessionExpired();
                throw new ApiError('Сессия истекла, войдите снова', 401);
            }
            return apiRequest(path, options, tokens?.access || '');
        }
        await sessionExpired();
        throw error;
    }
}
