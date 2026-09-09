document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auditForm');
    const success = document.getElementById('auditSuccess');
    form.addEventListener('submit', event => {
        event.preventDefault();
        form.classList.add('was-validated');
        if (!form.checkValidity()) { form.querySelector(':invalid')?.focus(); return; }
        const requests = JSON.parse(localStorage.getItem('itserve_audit_requests') || '[]');
        requests.push({ ...Object.fromEntries(new FormData(form).entries()), submittedAt: new Date().toISOString() });
        localStorage.setItem('itserve_audit_requests', JSON.stringify(requests));
        form.reset(); form.classList.remove('was-validated'); success.hidden = false; success.focus();
        setTimeout(() => { success.hidden = true; }, 6000);
    });
    document.querySelectorAll('#site-header .navbar-collapse a').forEach(link => link.addEventListener('click', () => {
        if (innerWidth < 992 && !link.classList.contains('dropdown-toggle')) bootstrap.Collapse.getOrCreateInstance(document.querySelector('#site-header .navbar-collapse'), { toggle: false }).hide();
    }));
    const run = element => { const target = Number(element.dataset.count), suffix = element.dataset.suffix || '', decimals = target % 1 ? 1 : 0, start = performance.now(); const tick = now => { const p = Math.min((now - start) / 850, 1), value = target * (1 - Math.pow(1 - p, 3)); element.textContent = value.toFixed(decimals) + suffix; if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
    if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { run(entry.target); observer.unobserve(entry.target); } }), { threshold: .35 }); document.querySelectorAll('[data-count]').forEach(item => observer.observe(item)); } else document.querySelectorAll('[data-count]').forEach(run);
});
