document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <h3 class="fw-bold mb-4">Account Settings</h3>
        
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="chart-box mb-4">
                    <h5 class="fw-bold mb-4 border-bottom pb-3">Application Preferences</h5>
                    
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h6 class="fw-bold mb-1">Dark Mode</h6>
                            <p class="text-muted small mb-0">Switch to dark theme for low-light environments.</p>
                        </div>
                        <div class="form-check form-switch fs-4">
                            <input class="form-check-input theme-toggle" type="checkbox" id="settingDarkMode">
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h6 class="fw-bold mb-1">Right-to-Left (RTL)</h6>
                            <p class="text-muted small mb-0">Change the application layout direction.</p>
                        </div>
                        <div class="form-check form-switch fs-4">
                            <input class="form-check-input rtl-toggle" type="checkbox" id="settingRTL">
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="w-75">
                            <h6 class="fw-bold mb-1">Language</h6>
                            <p class="text-muted small mb-0">Select your preferred language.</p>
                        </div>
                        <select class="form-select" onchange="showToast('Language preference saved.', 'success')">
                            <option>English</option>
                            <option>Arabic</option>
                            <option>French</option>
                        </select>
                    </div>
                </div>
                
                <div class="chart-box">
                    <h5 class="fw-bold mb-4 border-bottom pb-3">Notifications</h5>
                    
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 class="fw-bold mb-1">Email Notifications</h6>
                            <p class="text-muted small mb-0">Receive updates when a ticket status changes.</p>
                        </div>
                        <div class="form-check form-switch fs-4">
                            <input class="form-check-input" type="checkbox" checked onchange="showToast('Notification settings saved.')">
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 class="fw-bold mb-1">Weekly Reports</h6>
                            <p class="text-muted small mb-0">Get a weekly summary of your ticket activity.</p>
                        </div>
                        <div class="form-check form-switch fs-4">
                            <input class="form-check-input" type="checkbox" onchange="showToast('Notification settings saved.')">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <div class="chart-box border-danger border-opacity-50">
                    <h5 class="fw-bold text-danger mb-4 border-bottom border-danger border-opacity-25 pb-3">Danger Zone</h5>
                    
                    <p class="text-muted small mb-3">These actions cannot be undone. Please proceed with caution.</p>
                    
                    <button class="btn btn-outline-danger w-100 mb-3" onclick="if(confirm('Reset all local application data? This will delete all tickets, assets, and KB articles.')){localStorage.clear(); window.location.reload();}">Reset All Local Data</button>
                    
                    <button class="btn btn-danger w-100" onclick="if(confirm('Are you sure you want to delete your account?')){localStorage.removeItem(APP_KEYS.CURRENT_USER); window.location.href='login.html';}">Delete Account</button>
                </div>
            </div>
        </div>
    `;

    renderDashboardLayout(mainContent, 'settings');
    
    // Sync the large toggle switches in the settings page with the current state
    const theme = localStorage.getItem(APP_KEYS.THEME) || 'light';
    document.getElementById('settingDarkMode').checked = (theme === 'dark');
    
    const dir = localStorage.getItem(APP_KEYS.DIRECTION) || 'ltr';
    document.getElementById('settingRTL').checked = (dir === 'rtl');
});
