// ==========================================================================
// Dashboard Layout Injector
// ==========================================================================

function renderDashboardLayout(mainContentHTML, pageId = 'dashboard') {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    const firstName = user.fullName ? user.fullName.split(' ')[0] : 'User';
    const company = user.companyName || '';
    
    const isActive = (id) => pageId === id ? 'active' : '';

    const layoutHTML = `
    <div class="dashboard-wrapper position-relative">
        
        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
            <div class="p-4 d-flex align-items-center border-bottom border-light border-opacity-10">
                <a class="navbar-brand d-inline-block text-decoration-none" href="index.html">
                    <i class="bi bi-cpu text-primary fs-3"></i> 
                    <span class="fs-4 fw-bold text-dark">IT<span class="text-secondary">Serve</span></span>
                </a>
            </div>
            
            <div class="p-3">
                <div class="mb-4 px-3" id="sidebarProfile">
                    <div class="fw-bold text-dark fs-5 text-truncate" title="${user.fullName}">${user.fullName}</div>
                    ${company ? `<div class="small text-secondary text-truncate" title="${company}">${company}</div>` : ''}
                </div>
                
                <p class="text-uppercase small fw-bold text-muted px-3 mb-2">Main Menu</p>
                <nav class="nav flex-column mb-4">
                    <a href="dashboard.html" class="sidebar-link ${isActive('dashboard')}"><i class="bi bi-grid-fill"></i> Dashboard</a>
                    <a href="tickets.html" class="sidebar-link ${isActive('tickets')}"><i class="bi bi-ticket-detailed"></i> My Tickets</a>
                    <a href="create-ticket.html" class="sidebar-link ${isActive('create-ticket')}"><i class="bi bi-plus-circle-dotted"></i> Create Ticket</a>
                    <a href="assets.html" class="sidebar-link ${isActive('assets')}"><i class="bi bi-pc-display"></i> Assets</a>
                    <a href="knowledge.html" class="sidebar-link ${isActive('knowledge')}"><i class="bi bi-journal-text"></i> Knowledge Base</a>
                </nav>
                
                <p class="text-uppercase small fw-bold text-muted px-3 mb-2">Account</p>
                <nav class="nav flex-column">
                    <a href="reports.html" class="sidebar-link ${isActive('reports')}"><i class="bi bi-file-earmark-bar-graph"></i> Reports</a>
                    <a href="profile.html" class="sidebar-link ${isActive('profile')}"><i class="bi bi-person"></i> Profile</a>
                    <a href="settings.html" class="sidebar-link ${isActive('settings')}"><i class="bi bi-gear"></i> Settings</a>
                    <a href="#" class="sidebar-link text-danger logout-btn-dash"><i class="bi bi-box-arrow-right"></i> Logout</a>
                </nav>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Top Header -->
            <header class="dash-header d-flex justify-content-between align-items-center shadow-sm">
                <div class="d-flex align-items-center">
                    <button class="btn btn-light d-lg-none me-3" id="sidebarToggle"><i class="bi bi-list"></i></button>
                    <h5 class="mb-0 fw-bold d-none d-sm-block text-capitalize" id="dashPageTitle">${pageId.replace('-', ' ')}</h5>
                </div>
                
                <div class="d-flex align-items-center gap-3">
                    <button class="rtl-toggle rtl-control" type="button" aria-label="Switch page direction to right-to-left" aria-pressed="false" title="Switch page direction (LTR / RTL)"><i class="bi bi-text-right rtl-direction-icon" aria-hidden="true"></i><span>RTL</span></button>
                    <button class="btn btn-light rounded-circle theme-toggle p-2 d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;" title="Toggle Theme">
                        <i class="bi bi-moon-fill"></i>
                    </button>
                    <button class="btn btn-light rounded-circle p-2 position-relative d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
                        <i class="bi bi-bell"></i>
                        <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                    </button>
                    <div class="dropdown">
                        <button class="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border-0" type="button" data-bs-toggle="dropdown">
                            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; font-weight: bold;">
                                ${firstName.charAt(0).toUpperCase()}
                            </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                            <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                            <li><a class="dropdown-item" href="settings.html">Settings</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger logout-btn-dash" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            
            <!-- Page Specific Content -->
            <div class="p-4 p-md-5">
                ${mainContentHTML}
            </div>
        </main>
        
        <!-- Global Toast Container -->
        <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1100;" id="globalToastContainer"></div>
    </div>
    `;

    document.getElementById('app-layout').innerHTML = layoutHTML;

    // Bind Layout Events
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('show');
    });

    document.querySelectorAll('.logout-btn-dash').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                logoutUser();
            }
        });
    });

    // Re-bind theme/rtl toggles since we just injected new DOM
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
    document.querySelectorAll('.rtl-toggle').forEach(control => {
        control.addEventListener('click', () => setDirection(document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl'));
    });
    
    // Set correct initial states for the new toggles
    const theme = localStorage.getItem(APP_KEYS.THEME) || 'light';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        if (theme === 'dark') {
            btn.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            btn.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    });
    syncDirectionControls();
}

function showToast(message, type = 'success') {
    const container = document.getElementById('globalToastContainer');
    if (!container) return;
    
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body fw-medium">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    container.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
    bsToast.show();
    
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}
