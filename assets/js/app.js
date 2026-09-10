// ==========================================================================
// Centralized App Utilities
// ==========================================================================

const APP_KEYS = {
    USERS: 'itserve_users',
    CURRENT_USER: 'itserve_current_user',
    THEME: 'itserve_theme',
    DIRECTION: 'itserve_direction'
};

// The root index footer is the single shared footer for every public page.
// Keeping it here prevents individual pages from drifting out of sync.
const MASTER_FOOTER_HTML = `
<footer class="footer" id="site-footer">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <a class="navbar-brand d-inline-block mb-3" href="index.html">
                    <i class="bi bi-cpu text-primary fs-3"></i>
                    <span>IT<span class="text-secondary">Serve</span></span>
                </a>
                <p class="text-secondary mb-4 pe-lg-4">Your trusted partner for comprehensive IT support, network solutions, and managed services. We keep your business running smoothly.</p>
                <div class="d-flex gap-2">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="btn btn-sm btn-outline-primary rounded-circle" style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;"><i class="bi bi-facebook" aria-hidden="true"></i></a>
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X" class="btn btn-sm btn-outline-primary rounded-circle" style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;"><i class="bi bi-twitter-x" aria-hidden="true"></i></a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="btn btn-sm btn-outline-primary rounded-circle" style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;"><i class="bi bi-linkedin" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                <h5 class="footer-title">Company</h5>
                <ul class="footer-links">
                    <li><a href="about.html">About Us</a></li><li><a href="services.html">Services</a></li><li><a href="pricing.html">AMC Plans</a></li><li><a href="blog.html">News &amp; Blog</a></li><li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <h5 class="footer-title">Services</h5>
                <ul class="footer-links">
                    <li><a href="service-details.html?id=computer-repair">Computer Repair</a></li><li><a href="service-details.html?id=network-setup">Network Setup</a></li><li><a href="service-details.html?id=server-support">Server Maintenance</a></li><li><a href="service-details.html?id=data-backup">Data Backup</a></li><li><a href="emergency-support.html">Emergency Support</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6">
                <h5 class="footer-title">Contact Info</h5>
                <ul class="list-unstyled text-secondary">
                    <li class="mb-3 d-flex gap-3"><i class="bi bi-geo-alt text-primary fs-5" aria-hidden="true"></i><span>123 Tech Park, Innovation City, 10001</span></li>
                    <li class="mb-3 d-flex gap-3"><i class="bi bi-telephone text-primary fs-5" aria-hidden="true"></i><div><span>+1 (800) 123-4567</span><br><span class="small text-muted">24/7 Support Line</span></div></li>
                    <li class="mb-3 d-flex gap-3"><i class="bi bi-envelope text-primary fs-5" aria-hidden="true"></i><a class="text-secondary" href="mailto:support@itserve.com">support@itserve.com</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom text-center"><p class="text-muted mb-0 small">&copy; 2026 ITServe. All rights reserved. Designed for IT Professionals.</p></div>
    </div>
</footer>`;

function renderMasterFooter() {
    const page = window.location.pathname.split('/').pop().toLowerCase();
    if (page === 'login.html' || page === 'register.html' || page === 'signup.html') return;

    const existingFooters = document.querySelectorAll('footer');
    if (existingFooters.length) {
        existingFooters[0].outerHTML = MASTER_FOOTER_HTML;
        existingFooters.forEach((footer, index) => {
            if (index > 0) footer.remove();
        });
    } else {
        document.body.insertAdjacentHTML('beforeend', MASTER_FOOTER_HTML);
    }
}

// --- Storage Utilities ---
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(APP_KEYS.USERS)) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(APP_KEYS.USERS, JSON.stringify(users));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(APP_KEYS.CURRENT_USER)) || null;
    } catch {
        return null;
    }
}

// --- Authentication ---
function registerUser(userData) {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already registered.' };
    }
    users.push(userData);
    saveUsers(users);
    return { success: true };
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const sessionUser = {
            fullName: user.fullName,
            companyName: user.companyName,
            email: user.email,
            mobile: user.mobile
        };
        localStorage.setItem(APP_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
        return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
}

function logoutUser() {
    localStorage.removeItem(APP_KEYS.CURRENT_USER);
    window.location.href = 'login.html';
}

function requireAuth() {
    if (!getCurrentUser()) {
        window.location.href = 'login.html';
    }
}

function requireGuest() {
    if (getCurrentUser()) {
        window.location.href = 'dashboard.html';
    }
}

// --- Theme (Dark/Light Mode) ---
function loadTheme() {
    const theme = localStorage.getItem(APP_KEYS.THEME) || localStorage.getItem('itSupportTheme') || 'light';
    setTheme(theme);
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(APP_KEYS.THEME, theme);
    
    // Update all theme toggle icons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        if (theme === 'dark') {
            btn.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
            btn.setAttribute('aria-pressed', 'true');
            btn.setAttribute('aria-label', 'Switch to light mode');
            btn.setAttribute('title', 'Switch to light mode');
        } else {
            btn.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
            btn.setAttribute('aria-pressed', 'false');
            btn.setAttribute('aria-label', 'Switch to dark mode');
            btn.setAttribute('title', 'Switch to dark mode');
        }
    });
}

function toggleTheme() {
    const current = localStorage.getItem(APP_KEYS.THEME) || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// --- Direction (RTL/LTR) ---
function loadDirection() {
    // Older public pages stored this setting under itSupportRTL. Keep existing
    // visitors' preference while using one key everywhere going forward.
    const savedDirection = localStorage.getItem(APP_KEYS.DIRECTION);
    const legacyRTL = localStorage.getItem('itSupportRTL');
    const dir = savedDirection || (legacyRTL === 'true' ? 'rtl' : 'ltr');
    setDirection(dir);
}

function setDirection(dir) {
    const direction = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', 'en');
    localStorage.setItem(APP_KEYS.DIRECTION, direction);
    
    syncDirectionControls();
}

function syncDirectionControls() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    document.querySelectorAll('.rtl-toggle').forEach(control => {
        if (control.matches('input')) {
            control.checked = isRTL;
            control.setAttribute('aria-checked', String(isRTL));
        } else {
            control.setAttribute('aria-pressed', String(isRTL));
            control.setAttribute('aria-label', isRTL ? 'Switch page direction to left-to-right' : 'Switch page direction to right-to-left');
            control.setAttribute('title', isRTL ? 'Switch page direction to LTR' : 'Switch page direction to RTL');
            const directionIcon = control.querySelector('.rtl-direction-icon');
            if (directionIcon) {
                directionIcon.classList.toggle('bi-text-left', isRTL);
                directionIcon.classList.toggle('bi-text-right', !isRTL);
            }
        }
    });
}

function toggleDirection() {
    const current = localStorage.getItem(APP_KEYS.DIRECTION) || 'ltr';
    setDirection(current === 'rtl' ? 'ltr' : 'rtl');
}

// --- Initialization ---
// Execute immediately on parse
loadTheme();
loadDirection();

document.addEventListener('DOMContentLoaded', () => {
    renderMasterFooter();

    // Hide preloader if it exists
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Apply correct theme icon on load
    const theme = localStorage.getItem(APP_KEYS.THEME) || 'light';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        if (theme === 'dark') {
            btn.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
            btn.setAttribute('aria-pressed', 'true');
            btn.setAttribute('aria-label', 'Switch to light mode');
            btn.setAttribute('title', 'Switch to light mode');
        } else {
            btn.innerHTML = '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
            btn.setAttribute('aria-pressed', 'false');
            btn.setAttribute('aria-label', 'Switch to dark mode');
            btn.setAttribute('title', 'Switch to dark mode');
        }
    });

    
    // Update UI if logged in (for public pages)
    const currentUser = getCurrentUser();
    if(currentUser) {
        document.querySelectorAll('.auth-link').forEach(link => {
            link.innerHTML = '<i class="bi bi-person-circle me-1"></i> Dashboard';
            link.href = 'dashboard.html';
        });
        document.querySelectorAll('.signup-link').forEach(link => link.classList.add('d-none'));
    }

    // Bind all theme toggles
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
    
    // Synchronize controls created after the initial direction was applied,
    // then use the checkbox's actual value instead of toggling a second time.
    syncDirectionControls();
    document.querySelectorAll('.rtl-toggle').forEach(control => {
        control.addEventListener(control.matches('input') ? 'change' : 'click', () => {
            const direction = control.matches('input')
                ? (control.checked ? 'rtl' : 'ltr')
                : (document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl');
            setDirection(direction);
        });
    });

    // Replace old storage keys data to prevent conflicts if needed
    // (Optional but good for clean state)
});
