/* Shared public-site header. Keep navigation and preference controls in one place. */
(function () {
    const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const isActive = (path) => currentPath === path ? 'active' : '';
    const isBlogActive = () => currentPath === 'blog.html' || currentPath.startsWith('blog-');
    const isAuthPage = ['login.html', 'register.html', 'signup.html'].includes(currentPath);
    const preferenceControls = `
        <button class="theme-toggle nav-icon-button" type="button" aria-label="Switch to dark mode" aria-pressed="false" title="Switch to dark mode"><i class="bi bi-moon-fill" aria-hidden="true"></i></button>
        <button class="rtl-toggle rtl-control" type="button" aria-label="Switch page direction to right-to-left" aria-pressed="false" title="Switch page direction (LTR / RTL)"><i class="bi bi-text-right rtl-direction-icon" aria-hidden="true"></i><span>RTL</span></button>`;

    const headerHTML = `
        <div class="bg-primary text-white py-2 d-none d-lg-block">
            <div class="container"><div class="row align-items-center">
                <div class="col-md-6"><small><i class="bi bi-clock me-2" aria-hidden="true"></i>Mon - Sat: 9:00 AM - 6:00 PM</small><small class="ms-3"><i class="bi bi-geo-alt me-2" aria-hidden="true"></i>123 Tech Park, Innovation City</small></div>
                <div class="col-md-6 text-end"><small><i class="bi bi-envelope me-2" aria-hidden="true"></i>support@itservice.com</small><a href="emergency-support.html" class="btn btn-sm btn-danger ms-3 fw-bold"><i class="bi bi-exclamation-triangle-fill me-1" aria-hidden="true"></i>24/7 Emergency</a></div>
            </div></div>
        </div>
        <nav class="navbar navbar-expand-lg bg-transparent py-3" aria-label="Primary navigation">
            <div class="container">
                <a class="navbar-brand" href="index.html" aria-label="ITServe home"><i class="bi bi-cpu text-primary fs-3" aria-hidden="true"></i><span>IT<span class="text-secondary">Serve</span></span></a>
                <div class="mobile-header-controls d-flex d-lg-none align-items-center" role="group" aria-label="Display preferences">
                    ${preferenceControls}
                </div>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation" aria-expanded="false"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle ${isActive('index.html') || isActive('home-2.html')}" href="#" id="homeMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Home</a>
                            <ul class="dropdown-menu header-dropdown" aria-labelledby="homeMenu">
                                <li><a class="dropdown-item ${isActive('index.html')}" href="index.html">Home 1</a></li>
                                <li><a class="dropdown-item ${isActive('home-2.html')}" href="home-2.html">Home 2</a></li>
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link ${isActive('about.html')}" href="about.html">About</a></li>
                        <li class="nav-item"><a class="nav-link ${isActive('services.html') || isActive('service-details.html')}" href="services.html">Services</a></li>
                        <li class="nav-item"><a class="nav-link ${isActive('pricing.html')}" href="pricing.html">AMC Plans</a></li>
                        <li class="nav-item"><a class="nav-link ${isBlogActive() ? 'active' : ''}" href="blog.html">Blog</a></li>
                        <li class="nav-item"><a class="nav-link ${isActive('contact.html')}" href="contact.html">Contact</a></li>
                    </ul>
                    <div class="nav-actions d-flex align-items-center flex-wrap gap-2 mt-3 mt-lg-0">
                        <span class="d-none d-lg-flex align-items-center gap-2">${preferenceControls}</span>
                        <a href="login.html" class="nav-link fw-bold auth-link nav-auth-link"><i class="bi bi-box-arrow-in-right me-1" aria-hidden="true"></i>Login</a>
                        <a href="signup.html" class="btn btn-primary shadow-sm signup-link"><i class="bi bi-person-plus me-1" aria-hidden="true"></i>Sign Up</a>
                    </div>
                </div>
            </div>
        </nav>`;

    const authHeaderHTML = `<div class="auth-page-controls" role="group" aria-label="Display preferences">${preferenceControls}</div>`;
    const headerContainer = document.getElementById('site-header');
    if (!headerContainer) return;

    headerContainer.innerHTML = isAuthPage ? authHeaderHTML : headerHTML;

    if (!isAuthPage) {
        document.body.classList.add('has-fixed-header');

        // The header is fixed, so reserve exactly its initial (collapsed) height
        // in the document flow. This prevents the first section from sitting
        // beneath it on every viewport size.
        const updateHeaderOffset = () => {
            document.body.style.setProperty('--site-header-height', `${headerContainer.offsetHeight}px`);
        };
        requestAnimationFrame(updateHeaderOffset);
        window.addEventListener('resize', updateHeaderOffset, { passive: true });
    }
}());
