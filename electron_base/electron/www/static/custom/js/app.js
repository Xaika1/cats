var root = document.documentElement;

function readTheme() {
    try {
        return localStorage.getItem('theme') || 'light';
    } catch (error) {
        return 'light';
    }
}

function setTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    try {
        localStorage.setItem('theme', theme);
    } catch (error) {}
    syncIcon();
}

function syncIcon() {
    var icon = document.getElementById('themeIcon');
    if (!icon) return;
    var dark = root.getAttribute('data-bs-theme') === 'dark';
    icon.classList.toggle('bi-sun', dark);
    icon.classList.toggle('bi-moon-stars', !dark);
}

setTheme(readTheme());

new MutationObserver(syncIcon).observe(document.getElementById('root'), { childList: true });

document.addEventListener('click', function (event) {
    if (!event.target.closest('#themeToggle')) return;
    setTheme(root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
});
