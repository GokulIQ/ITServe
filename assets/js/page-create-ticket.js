document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h3 class="fw-bold mb-0">Create New Ticket</h3>
            <a href="tickets.html" class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i> Back to Tickets</a>
        </div>
        
        <div class="row">
            <div class="col-lg-8">
                <div class="chart-box">
                    <form id="createTicketForm" class="needs-validation" novalidate>
                        <div class="mb-4">
                            <label class="form-label fw-bold small">Subject <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="ticketSubject" placeholder="Brief description of the issue" required>
                            <div class="invalid-feedback">Please provide a subject.</div>
                        </div>
                        
                        <div class="row mb-4">
                            <div class="col-md-6 mb-3 mb-md-0">
                                <label class="form-label fw-bold small">Category <span class="text-danger">*</span></label>
                                <select class="form-select" id="ticketCategory" required>
                                    <option value="">Select Category...</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="Network">Network</option>
                                    <option value="Account">Account/Access</option>
                                    <option value="Server">Server</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div class="invalid-feedback">Please select a category.</div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold small">Priority <span class="text-danger">*</span></label>
                                <select class="form-select" id="ticketPriority" required>
                                    <option value="">Select Priority...</option>
                                    <option value="Low">Low (Minor issue)</option>
                                    <option value="Medium">Medium (Standard)</option>
                                    <option value="High">High (Urgent)</option>
                                    <option value="Critical">Critical (System Down)</option>
                                </select>
                                <div class="invalid-feedback">Please select a priority.</div>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <label class="form-label fw-bold small">Detailed Description <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="ticketDesc" rows="6" placeholder="Provide as much detail as possible to help us resolve the issue quickly..." required></textarea>
                            <div class="invalid-feedback">Please provide a description.</div>
                        </div>
                        
                        <div class="mb-4">
                            <label class="form-label fw-bold small">Attachments (Optional)</label>
                            <div class="file-drop-area">
                                <i class="bi bi-cloud-arrow-up display-4 text-primary opacity-50 mb-3 d-block"></i>
                                <h5>Drag & Drop files here</h5>
                                <p class="text-muted small mb-0">or click to browse (Max 5MB)</p>
                            </div>
                        </div>
                        
                        <hr class="mb-4 border-secondary border-opacity-25">
                        
                        <div class="d-flex justify-content-end gap-3">
                            <a href="dashboard.html" class="btn btn-light">Cancel</a>
                            <button type="submit" class="btn btn-primary px-4">Submit Ticket</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="col-lg-4 mt-4 mt-lg-0">
                <div class="chart-box bg-light border-0">
                    <h5 class="fw-bold mb-3"><i class="bi bi-info-circle text-primary me-2"></i> Before you submit</h5>
                    <ul class="text-muted small ps-3 mb-0" style="line-height: 1.8;">
                        <li>Check the <strong>Knowledge Base</strong> first. Your issue might already be solved!</li>
                        <li>Include any relevant error codes or messages you received.</li>
                        <li>Specify exactly when the issue started occurring.</li>
                        <li>For hardware issues, include the device's Asset ID if known.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    renderDashboardLayout(mainContent, 'create-ticket');
    
    document.getElementById('createTicketForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }
        
        const subject = document.getElementById('ticketSubject').value;
        const category = document.getElementById('ticketCategory').value;
        const priority = document.getElementById('ticketPriority').value;
        const desc = document.getElementById('ticketDesc').value;
        const user = getCurrentUser();
        
        const newTicket = {
            id: 'ITS-' + Math.floor(1000 + Math.random() * 9000),
            subject,
            category,
            priority,
            description: desc,
            status: 'Open',
            date: new Date().toISOString(),
            assignee: 'Unassigned'
        };
        
        DB.saveTicket(newTicket);
        
        // Use sessionStorage to pass toast message to the next page
        sessionStorage.setItem('toastMessage', `Ticket ${newTicket.id} created successfully!`);
        window.location.href = 'tickets.html';
    });
});
