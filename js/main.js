/* ============================================================
   MODO OSCURO / CLARO
   ============================================================ */
(function initTheme() {
    const toggleBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️';
    } else {
        toggleBtn.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', function () {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.textContent = isDark ? '☀️' : '🌙';
    });
})();

/* ============================================================
   MENÚ MÓVIL
   ============================================================ */
(function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const links  = document.getElementById('navLinks');

    toggle.addEventListener('click', () => links.classList.toggle('open'));

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => links.classList.remove('open'));
    });
})();

/* ============================================================
   TABS
   ============================================================ */
(function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
})();

function switchTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

    const tabBtn = document.querySelector(`.tab[data-tab="${id}"]`);
    if (tabBtn) tabBtn.classList.add('active');

    const panel = document.getElementById('panel-' + id);
    if (panel) panel.classList.add('active');
}

/* ============================================================
   ACORDEÓN
   ============================================================ */
(function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
    });
})();

function toggleAccordion(header) {
    const item  = header.parentElement;
    const wasOpen = item.classList.contains('open');
    const panel = item.closest('.panel');

    if (panel) {
        panel.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    }
    if (!wasOpen) item.classList.add('open');
}

/* ============================================================
   REVEAL AL HACER SCROLL
   ============================================================ */
(function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: .1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   SOMBRA DE LA NAVBAR AL HACER SCROLL
   ============================================================ */
(function initNavbarShadow() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,.08)';
        } else {
            nav.style.boxShadow = 'var(--nav-shadow)';
        }
    });
})();

/* ============================================================
   FORMULARIO DE CONTACTO
   ============================================================ */
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nombre  = document.getElementById('nombre').value;
        const email   = document.getElementById('email').value;
        const asunto  = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        const body = `Nombre: ${nombre}%0D%0ACorreo: ${email}%0D%0A%0D%0A${mensaje}`;
        window.location.href =
            `mailto:ldsmartlabmipc@outlook.com?subject=${encodeURIComponent(asunto)}&body=${body}`;

        alert('Gracias por su mensaje. Se abrirá su cliente de correo para enviar la sugerencia.');
        form.reset();
    });
})();