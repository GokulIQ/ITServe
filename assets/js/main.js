// ==========================================================================
// Main Application Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // Small delay to show off design
    }

    // 2. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky-top', 'bg-surface', 'glass-nav');
                navbar.classList.remove('bg-transparent', 'py-3');
            } else {
                navbar.classList.remove('sticky-top', 'bg-surface', 'glass-nav');
                navbar.classList.add('bg-transparent', 'py-3');
            }
        });
    }

    // 3. Setup global toast container if not exists
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '1055';
        document.body.appendChild(container);
    }
});

// Toast Notification Helper
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    let icon = 'bi-check-circle-fill';
    let colorClass = 'text-success';
    
    if (type === 'error' || type === 'danger') {
        icon = 'bi-x-circle-fill';
        colorClass = 'text-danger';
    } else if (type === 'warning') {
        icon = 'bi-exclamation-triangle-fill';
        colorClass = 'text-warning';
    } else if (type === 'info') {
        icon = 'bi-info-circle-fill';
        colorClass = 'text-primary';
    }

    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-bg-light border-0 shadow-sm mb-2" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center gap-2">
                    <i class="bi ${icon} ${colorClass} fs-5"></i>
                    <span class="fw-medium text-primary-emphasis">${message}</span>
                </div>
                <button type="button" class="btn-close btn-close-dark me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    
    // Ensure bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const bsToast = new bootstrap.Toast(toastElement, { delay: 3000 });
        bsToast.show();
        
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    } else {
        // Fallback if BS JS fails
        toastElement.classList.add('show');
        setTimeout(() => {
            toastElement.classList.remove('show');
            setTimeout(() => toastElement.remove(), 300);
        }, 3000);
    }
}
