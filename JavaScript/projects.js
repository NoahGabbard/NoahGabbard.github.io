document.addEventListener('DOMContentLoaded', function() {
    var backArrow = document.getElementById('back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        backArrow.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = 'index.html';
            }
        });
    }
});