document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <h3 class="fw-bold mb-4">My Profile</h3>
        
        <div class="row g-4">
            <div class="col-lg-4">
                <div class="chart-box text-center h-100 d-flex flex-column align-items-center justify-content-center py-5">
                    <div class="profile-avatar-large mx-auto mb-3 shadow-sm" id="profAvatar">U</div>
                    <h5 class="fw-bold mb-1" id="profNameDisplay">User Name</h5>
                    <p class="text-muted small mb-3" id="profCompanyDisplay">Company</p>
                    <button class="btn btn-sm btn-outline-primary rounded-pill px-3" onclick="showToast('Profile photo updated!', 'success')">Change Photo</button>
                </div>
            </div>
            
            <div class="col-lg-8">
                <div class="chart-box h-100">
                    <h5 class="fw-bold mb-4 border-bottom pb-3">Personal Information</h5>
                    <form id="profileForm" class="needs-validation" novalidate>
                        <div class="row g-3 mb-3">
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Full Name</label>
                                <input type="text" class="form-control" id="profName" required>
                                <div class="invalid-feedback">Please provide your name.</div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Email Address</label>
                                <input type="email" class="form-control" id="profEmail" readonly disabled>
                                <div class="form-text">Email address cannot be changed.</div>
                            </div>
                        </div>
                        <div class="row g-3 mb-4">
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Phone Number</label>
                                <input type="text" class="form-control" id="profPhone">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-bold">Department / Company</label>
                                <input type="text" class="form-control" id="profCompany">
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary px-4">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    renderDashboardLayout(mainContent, 'profile');
    initProfilePage();
});

function initProfilePage() {
    const user = getCurrentUser();
    if(!user) return;
    
    document.getElementById('profAvatar').innerText = user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';
    document.getElementById('profNameDisplay').innerText = user.fullName;
    document.getElementById('profCompanyDisplay').innerText = user.companyName || user.mobile || 'No details provided';
    
    document.getElementById('profName').value = user.fullName;
    document.getElementById('profEmail').value = user.email;
    document.getElementById('profPhone').value = user.mobile || '';
    document.getElementById('profCompany').value = user.companyName || '';
    
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }
        
        const newName = document.getElementById('profName').value;
        const newPhone = document.getElementById('profPhone').value;
        const newCompany = document.getElementById('profCompany').value;
        
        const updatedUser = { ...user, fullName: newName, mobile: newPhone, companyName: newCompany };
        localStorage.setItem(APP_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
        
        // Also update the users array
        const users = JSON.parse(localStorage.getItem(APP_KEYS.USERS)) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if(userIndex > -1) {
            users[userIndex] = { ...users[userIndex], ...updatedUser };
            localStorage.setItem(APP_KEYS.USERS, JSON.stringify(users));
        }
        
        showToast('Profile updated successfully!');
        
        // Update display
        document.getElementById('profAvatar').innerText = newName.charAt(0).toUpperCase();
        document.getElementById('profNameDisplay').innerText = newName;
        document.getElementById('profCompanyDisplay').innerText = newCompany || newPhone || '';
        document.getElementById('sidebarProfile').innerHTML = `
            <div class="fw-bold text-dark fs-5 text-truncate" title="${newName}">${newName}</div>
            ${newCompany ? `<div class="small text-secondary text-truncate" title="${newCompany}">${newCompany}</div>` : ''}
        `;
    });
}
