function navigateToProjects() {
    window.location.href = 'projects.html';
}

document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function getTheme() {
        return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function setTheme(theme) {
        var isDark = theme === 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        toggle.setAttribute('aria-pressed', String(isDark));
        var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
        toggle.textContent = isDark ? '☀' : '☾';
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            // Persisting theme is optional; ignore storage errors.
        }
    }

    setTheme(getTheme());
    toggle.addEventListener('click', function () {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
});
