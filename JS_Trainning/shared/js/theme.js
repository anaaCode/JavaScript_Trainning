(function () {
  // Apply saved theme immediately (before paint) to avoid flash
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function updateLabel(theme) {
      const dark = btn.querySelector('.icon-dark');
      const light = btn.querySelector('.icon-light');
      const label = btn.querySelector('.toggle-label');
      if (theme === 'light') {
        label.textContent = 'Dark';
      } else {
        label.textContent = 'Light';
      }
    }

    updateLabel(saved);

    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateLabel(next);
    });
  });
})();