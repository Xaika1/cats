import { data } from '../conf/state.js';
import { authenticatedRequest } from '../conf/api.js';
import { render, redirect } from '../conf/render.js';
import { registerLoader, invalidate } from '../conf/loaders.js';

export const STATUS_LABELS = {
    healthy: 'Здоров',
    observation: 'Наблюдение',
    sick: 'Болен',
    none: 'Нет записей',
};

export const GENDER_LABELS = {
    male: 'Кот',
    female: 'Кошка',
};

data.statusLabels = STATUS_LABELS;
data.genderLabels = GENDER_LABELS;

let focusSearch = false;

function query(values) {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
        if (value) params.set(key, value);
    });
    const text = params.toString();
    return text ? `?${text}` : '';
}

async function loadCats() {
    const [cats, breeds, stats] = await Promise.all([
        authenticatedRequest(`/cats/${query(data.filters)}`),
        authenticatedRequest('/cats/breeds/'),
        authenticatedRequest('/cats/stats/'),
    ]);
    data.cats = cats;
    data.breeds = breeds;
    data.stats = stats;
    data.loadError = '';
}

async function loadCat(params) {
    try {
        const [cat, health] = await Promise.all([
            authenticatedRequest(`/cats/${params.id}/`),
            authenticatedRequest(`/cats/${params.id}/health/${query(data.healthFilters)}`),
        ]);
        data.cat = cat;
        data.health = health;
        data.weightChart = weightChart(health);
        data.loadError = '';
    } catch (error) {
        if (error.status === 404) {
            window.ui.toast('Котик не найден', 'danger');
            redirect('/cats');
            return;
        }
        throw error;
    }
}

function weightChart(records) {
    const points = records
        .filter((item) => item.weight !== null && item.weight !== undefined)
        .map((item) => ({ date: item.date, weight: Number(item.weight) }))
        .sort((a, b) => a.date.localeCompare(b.date));
    if (points.length < 2) return null;

    const width = 320;
    const height = 90;
    const pad = 10;
    const weights = points.map((p) => p.weight);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const span = max - min || 1;
    const coords = points.map((p, i) => ({
        x: pad + (i * (width - pad * 2)) / (points.length - 1),
        y: height - pad - ((p.weight - min) * (height - pad * 2)) / span,
        weight: p.weight,
        date: p.date,
    }));
    const line = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
    const first = coords[0];
    const last = coords[coords.length - 1];
    return {
        width,
        height,
        line,
        area: `${first.x.toFixed(1)},${height} ${line} ${last.x.toFixed(1)},${height}`,
        dots: coords,
        min,
        max,
        delta: Math.round((last.weight - first.weight) * 100) / 100,
    };
}

registerLoader('/', () => loadCats());
registerLoader('/cats', (params) => (params.id ? loadCat(params) : loadCats()));

export function reload() {
    invalidate();
    render(true);
}

export function takeSearchFocus() {
    const value = focusSearch;
    focusSearch = false;
    return value;
}

export function openCat(id) {
    data.healthFilters = { status: '', date_from: '', date_to: '' };
    data.healthFormId = null;
    data.showCatForm = false;
    redirect(`/cats?id=${id}`);
}

export function backToCats() {
    data.showCatForm = false;
    data.healthFormId = null;
    invalidate();
    redirect('/cats');
}

export function setFilter(key, value) {
    data.filters[key] = String(value || '').trim();
    focusSearch = key === 'name';
    reload();
}

export function resetFilters() {
    data.filters = { name: '', status: '', gender: '', breed: '', sort: 'name' };
    reload();
}

export function setHealthFilter(key, value) {
    data.healthFilters[key] = value || '';
    reload();
}

export function resetHealthFilters() {
    data.healthFilters = { status: '', date_from: '', date_to: '' };
    reload();
}

function today() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
}

export function toggleCatForm(id = null) {
    const open = !(data.showCatForm && String(data.catFormId) === String(id));
    data.showCatForm = open;
    data.catFormId = open ? id : null;
    if (open) {
        const source = id ? data.cat : {};
        data.catForm = {
            cat_name: source.cat_name || '',
            cat_information: source.cat_information || '',
            breed: source.breed || '',
            gender: source.gender || 'male',
            age: source.age ?? '',
            photo: source.photo || '',
        };
    }
    render(true);
}

export async function saveCat(id, fields, file, removePhoto) {
    const form = new FormData();
    form.append('cat_name', fields.cat_name);
    form.append('cat_information', fields.cat_information || '');
    form.append('breed', fields.breed || '');
    form.append('gender', fields.gender || 'male');
    form.append('age', fields.age === '' || fields.age === null || fields.age === undefined ? '' : String(fields.age));
    if (file) form.append('cat_url', file);
    if (removePhoto && !file) form.append('remove_photo', 'true');

    const saved = await authenticatedRequest(id ? `/cats/${id}/` : '/cats/', {
        method: id ? 'PUT' : 'POST',
        body: form,
    });

    data.showCatForm = false;
    data.catFormId = null;
    window.ui.toast(id ? 'Изменения сохранены' : `Котик «${saved.cat_name}» добавлен`, 'success');
    if (id) reload();
    else openCat(saved.id);
}

export async function removeCat(id) {
    await authenticatedRequest(`/cats/${id}/`, { method: 'DELETE' });
    window.ui.toast('Котик удалён', 'success');
    backToCats();
}

export function toggleHealthForm(id = null) {
    if (id === null || id === undefined || id === '') {
        data.healthFormId = data.healthFormId === 'new' ? null : 'new';
        data.healthForm = { date: today(), status: 'healthy', weight: data.cat.last_weight ?? '', note: '' };
    } else {
        const record = data.health.find((item) => String(item.id) === String(id)) || {};
        data.healthFormId = String(data.healthFormId) === String(id) ? null : record.id ?? id;
        data.healthForm = {
            date: record.date || today(),
            status: record.status || 'healthy',
            weight: record.weight ?? '',
            note: record.note || '',
        };
    }
    render(true);
}

export function closeHealthForm() {
    data.healthFormId = null;
    render(true);
}

export async function saveHealth(catId, id, fields) {
    const body = {
        date: fields.date,
        status: fields.status,
        weight: fields.weight === '' || fields.weight === null || fields.weight === undefined ? null : Number(fields.weight),
        note: fields.note || '',
    };
    const isNew = !id || id === 'new';
    await authenticatedRequest(isNew ? `/cats/${catId}/health/` : `/health/${id}/`, {
        method: isNew ? 'POST' : 'PUT',
        body,
    });
    data.healthFormId = null;
    window.ui.toast(isNew ? 'Запись добавлена' : 'Запись обновлена', 'success');
    reload();
}

export async function removeHealth(id) {
    await authenticatedRequest(`/health/${id}/`, { method: 'DELETE' });
    data.healthFormId = null;
    window.ui.toast('Запись удалена', 'success');
    reload();
}
