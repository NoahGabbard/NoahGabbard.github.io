document.addEventListener('DOMContentLoaded', function () {
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        function getTheme() {
            return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        }

        function setTheme(theme) {
            var isDark = theme === 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            themeToggle.setAttribute('aria-pressed', String(isDark));
            var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
            themeToggle.setAttribute('aria-label', label);
            themeToggle.setAttribute('title', label);
            themeToggle.textContent = isDark ? 'Switch to Light Mode ☀' : 'Switch to Dark Mode ☾';
            try {
                localStorage.setItem('theme', theme);
            } catch (error) {
                // Persisting theme is optional; ignore storage errors.
            }
        }

        setTheme(getTheme());
        themeToggle.addEventListener('click', function () {
            setTheme(getTheme() === 'dark' ? 'light' : 'dark');
        });
    }

    // Back navigation
    var backArrow = document.getElementById('back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
        backArrow.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = 'index.html';
            }
        });
    }

    var container = document.getElementById('projects');
    if (!container) return;

    // Show loading state
    container.innerHTML =
        '<div class="loading-state"><div class="spinner"></div><p>Loading projects&hellip;</p></div>';

    fetch('https://api.github.com/users/NoahGabbard/repos?sort=updated&per_page=50')
        .then(function (response) {
            if (!response.ok) throw new Error('Request failed: ' + response.status);
            return response.json();
        })
        .then(function (repos) {
            container.setAttribute('aria-busy', 'false');
            container.innerHTML = '';

            var filtered = repos.filter(function (r) { return !r.fork; });

            if (!filtered.length) {
                container.innerHTML = '<p class="loading-state">No public repositories found.</p>';
                return;
            }

            filtered.forEach(function (repo) {
                var card = document.createElement('div');
                card.className = 'project-card';

                var title = document.createElement('h3');
                title.textContent = repo.name;
                card.appendChild(title);

                var desc = document.createElement('p');
                desc.textContent = repo.description || 'No description provided.';
                card.appendChild(desc);

                var meta = document.createElement('div');
                meta.className = 'project-card-meta';

                if (repo.language) {
                    var lang = document.createElement('span');
                    lang.className = 'lang-badge';
                    lang.textContent = repo.language;
                    meta.appendChild(lang);
                }

                if (repo.stargazers_count > 0) {
                    var stars = document.createElement('span');
                    stars.className = 'meta-stat';
                    stars.textContent = '\u2605 ' + repo.stargazers_count;
                    meta.appendChild(stars);
                }

                card.appendChild(meta);

                var link = document.createElement('a');
                // Validate URL origin before assigning
                if (repo.html_url && repo.html_url.startsWith('https://github.com/')) {
                    link.href = repo.html_url;
                } else {
                    link.href = 'https://github.com/NoahGabbard';
                }
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = 'View Repository \u2192';
                card.appendChild(link);

                container.appendChild(card);
            });
        })
        .catch(function () {
            container.setAttribute('aria-busy', 'false');
            container.innerHTML = '<p class="error-msg">Unable to load projects at this time. Please try again later.</p>';
        });
});