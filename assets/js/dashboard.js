// ==========================================================================
// Dashboard Behaviors
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Check auth on dashboard pages
    if(document.querySelector('.dashboard-wrapper')) {
        requireAuth();
        populateDashboardUser();
    }
    
    // Mobile Sidebar Toggle
    const mobileToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('dashboardSidebar');
    let overlay = document.getElementById('sidebarOverlay');
    
    // Create overlay if missing
    if (sidebar && !overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sidebarOverlay';
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    if (mobileToggle && sidebar && overlay) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.add('show');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
        
        const closeSidebar = () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        };

        overlay.addEventListener('click', closeSidebar);
        
        // Also close sidebar if clicking a link inside it on mobile
        const sidebarLinks = sidebar.querySelectorAll('.nav-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth < 992) {
                    closeSidebar();
                }
            });
        });
    }
});

function populateDashboardUser() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Update user names in UI
    const nameEls = document.querySelectorAll('.user-name-display');
    nameEls.forEach(el => el.textContent = user.name);
    
    const emailEls = document.querySelectorAll('.user-email-display');
    emailEls.forEach(el => el.textContent = user.email);
    
    const initialsEls = document.querySelectorAll('.user-initials');
    initialsEls.forEach(el => {
        el.textContent = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    });
}
