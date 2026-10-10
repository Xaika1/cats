const path = require('path');
const nunjucks = require('nunjucks');

const env = nunjucks.configure(path.join(__dirname, '..', 'templates'), {
    autoescape: true,
    throwOnUndefined: false,
});

const user = {
    username: 'anna',
    first_name: 'Анна',
    last_name: 'Иванова',
    email: 'anna@example.com',
    initial: 'А',
    initials: 'АИ',
    display_name: 'Анна Иванова',
    date_joined_label: '03.10.2026',
};

const emptyUser = { initial: '?', initials: '?', display_name: '', date_joined_label: '' };

const cats = [
    {
        id: 1, cat_name: 'Барсик', cat_information: 'Рыжий домашний кот', breed: 'Беспородный',
        gender: 'male', gender_display: 'Кот', age: 4, photo: 'http://127.0.0.1:8000/media/images/barsik.jpg', photo_credit: 'LauraDelga, CC BY 4.0, Wikimedia Commons',
        last_status: 'healthy', last_status_display: 'Здоров', last_date: '2026-10-08', last_weight: 4.3, health_count: 2,
    },
    {
        id: 2, cat_name: 'Мурка', cat_information: '', breed: '', gender: 'female', gender_display: 'Кошка',
        age: null, photo: '', last_status: 'sick', last_status_display: 'Болен', last_date: '2026-10-01', last_weight: null, health_count: 1,
    },
    {
        id: 3, cat_name: 'Персик', cat_information: 'Пушистый перс', breed: 'Персидская', gender: 'male', gender_display: 'Кот',
        age: 0, photo: '', last_status: '', last_status_display: '', last_date: '', last_weight: null, health_count: 0,
    },
];

const health = [
    { id: 1, cat: 1, date: '2026-10-08', status: 'healthy', status_display: 'Здоров', weight: 4.3, note: 'Вес в норме' },
    { id: 2, cat: 1, date: '2026-10-01', status: 'observation', status_display: 'Наблюдение', weight: null, note: '' },
];

const weightChart = {
    width: 320, height: 90, line: '10,10 310,80', area: '10,90 10,10 310,80 310,90',
    dots: [{ x: 10, y: 10, weight: 4.5, date: '2026-10-01' }, { x: 310, y: 80, weight: 4.3, date: '2026-10-08' }],
    min: 4.3, max: 4.5, delta: -0.2,
};

const base = {
    appName: 'Котокафе',
    title: 'Котики',
    authenticated: true,
    user,
    route: '/cats',
    params: {},
    cats,
    breeds: ['Беспородный', 'Персидская'],
    stats: { total: 3, healthy: 1, observation: 0, sick: 1, none: 1, records: 3 },
    filters: { name: '', status: '', gender: '', breed: '', sort: 'name' },
    healthFilters: { status: '', date_from: '', date_to: '' },
    showCatForm: false,
    catFormId: null,
    catForm: { cat_name: '', cat_information: '', breed: '', gender: 'male', age: '', photo: '' },
    healthFormId: null,
    healthForm: {},
    weightChart: null,
    editProfile: false,
    loadError: '',
};

const detail = { ...base, params: { id: '1' }, cat: cats[0], health, weightChart };

const cases = [
    ['cats.html', base, ['Барсик', 'Мурка', 'Персик', 'меньше года', '4 года', 'Показано 3 из 3']],
    ['cats.html', { ...base, cats: [], filters: { ...base.filters, name: 'яяя', status: 'sick' } }, ['Котики не найдены']],
    ['cats.html', { ...base, cats: [], showCatForm: true, loadError: 'Сервер не отвечает' }, ['Сервер не отвечает', 'Новый котик']],
    ['cat_detail.html', detail, ['Сведения о здоровье', '08.10.2026', 'Динамика веса', '-0.2 кг', 'Фото: LauraDelga']],
    ['cat_detail.html', { ...detail, cat: cats[1], health: [], weightChart: null, healthFormId: 'new',
        healthForm: { date: '2026-10-10', status: 'healthy', weight: '', note: '' } }, ['Новая запись']],
    ['cat_detail.html', { ...detail, showCatForm: true, catFormId: '1', catForm: { ...base.catForm, cat_name: 'Барсик', photo: cats[0].photo } }, ['Редактирование котика']],
    ['cat_detail.html', { ...detail, healthFormId: 1, healthForm: { date: '2026-10-08', status: 'healthy', weight: 4.3, note: 'Вес в норме' } }, ['Изменение записи']],
    ['profile.html', { ...base, route: '/profile' }, ['Анна Иванова', '@anna']],
    ['profile.html', { ...base, route: '/profile', editProfile: true }, ['profileForm']],
    ['profile.html', { ...base, user: emptyUser }, ['Профиль']],
    ['auth/login.html', { ...base, user: emptyUser }, ['Вход в аккаунт']],
    ['auth/reg.html', { ...base, user: emptyUser }, ['Создать аккаунт']],
];

let failed = 0;
for (const [name, ctx, expected] of cases) {
    try {
        const html = env.render(name, ctx);
        const missing = expected.filter((text) => !html.includes(text));
        if (missing.length) throw new Error(`нет текста: ${missing.join(', ')}`);
        console.log(`ok   ${name}  (${html.length} симв.)`);
    } catch (err) {
        failed += 1;
        console.log(`FAIL ${name}: ${err.message}`);
    }
}

console.log(failed ? `\n${failed} ошибок` : '\nВсе шаблоны рендерятся');
process.exit(failed ? 1 : 0);
