document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h3 class="fw-bold mb-0">Overview</h3>
            <div class="d-flex gap-2">
                <a href="create-ticket.html" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i> Create New Ticket</a>
            </div>
        </div>
        
        <!-- Stats Row -->
        <div class="dashboard-grid mb-4" id="dashboardStatsRow">
            <!-- Populated by JS -->
        </div>
        
        <!-- Quick Actions & Charts Row -->
        <div class="row g-4 mb-4">
            <!-- Quick Actions -->
            <div class="col-lg-3">
                <div class="chart-box h-100">
                    <h5 class="fw-bold mb-4">Quick Actions</h5>
                    <div class="d-grid gap-3">
                        <a href="create-ticket.html" class="btn btn-outline-primary text-start"><i class="bi bi-plus-circle me-2"></i> Create New Ticket</a>
                        <a href="tickets.html" class="btn btn-outline-secondary text-start"><i class="bi bi-list-task me-2"></i> View All Tickets</a>
                        <a href="knowledge.html" class="btn btn-outline-secondary text-start"><i class="bi bi-book me-2"></i> View Knowledge Base</a>
                        <a href="#" class="btn btn-outline-secondary text-start" onclick="showToast('Contact support initialized.', 'info')"><i class="bi bi-headset me-2"></i> Contact Support</a>
                    </div>
                </div>
            </div>
            
            <!-- Pie Chart -->
            <div class="col-lg-4">
                <div class="chart-box h-100 text-center">
                    <h5 class="fw-bold mb-4 text-start">Ticket Overview</h5>
                    <div class="css-pie mb-4" id="ticketPieChart"></div>
                    <div class="d-flex justify-content-center flex-wrap gap-3 small fw-medium" id="pieLegends">
                        <!-- Populated by JS -->
                    </div>
                </div>
            </div>
            
            <!-- Bar Chart -->
            <div class="col-lg-5">
                <div class="chart-box h-100">
                    <h5 class="fw-bold mb-4">Monthly Ticket Activity</h5>
                    <div class="css-bar-chart" id="activityBarChart">
                        <!-- Populated by JS -->
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Recent Tickets Table -->
        <div class="chart-box mb-4 overflow-hidden p-0">
            <div class="p-4 border-bottom d-flex justify-content-between align-items-center">
                <h5 class="fw-bold mb-0">Recent Tickets</h5>
                <a href="tickets.html" class="btn btn-sm btn-light">View All</a>
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light text-secondary">
                        <tr>
                            <th class="ps-4">Ticket ID</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Assigned To</th>
                            <th class="pe-4">Action</th>
                        </tr>
                    </thead>
                    <tbody class="border-top-0" id="recentTicketsBody">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    renderDashboardLayout(mainContent, 'dashboard');
    
    // Welcome message override
    const dashPageTitle = document.getElementById('dashPageTitle');
    const user = getCurrentUser();
    if (dashPageTitle && user) {
        const hours = new Date().getHours();
        let greeting = 'Good evening';
        if (hours < 12) greeting = 'Good morning';
        else if (hours < 18) greeting = 'Good afternoon';
        dashPageTitle.innerText = `${greeting}, ${user.fullName.split(' ')[0]}`;
    }

    loadDashboardData();
});

function loadDashboardData() {
    const stats = DB.getTicketStats();
    
    // Update Stats Row
    document.getElementById('dashboardStatsRow').innerHTML = `
        <div class="stat-card">
            <div>
                <p class="text-secondary mb-1 fw-medium">Total Tickets</p>
                <h3 class="fw-bold mb-0">${stats.total}</h3>
            </div>
            <div class="stat-icon bg-primary bg-opacity-10 text-primary">
                <i class="bi bi-ticket-detailed"></i>
            </div>
        </div>
        <div class="stat-card">
            <div>
                <p class="text-secondary mb-1 fw-medium">Open Tickets</p>
                <h3 class="fw-bold mb-0">${stats.open}</h3>
            </div>
            <div class="stat-icon bg-danger bg-opacity-10 text-danger">
                <i class="bi bi-exclamation-circle"></i>
            </div>
        </div>
        <div class="stat-card">
            <div>
                <p class="text-secondary mb-1 fw-medium">In Progress</p>
                <h3 class="fw-bold mb-0">${stats.inProgress}</h3>
            </div>
            <div class="stat-icon bg-warning bg-opacity-10 text-warning">
                <i class="bi bi-tools"></i>
            </div>
        </div>
        <div class="stat-card">
            <div>
                <p class="text-secondary mb-1 fw-medium">Resolved Tickets</p>
                <h3 class="fw-bold mb-0">${stats.resolved}</h3>
            </div>
            <div class="stat-icon bg-success bg-opacity-10 text-success">
                <i class="bi bi-check-circle"></i>
            </div>
        </div>
    `;

    // Update Pie Chart
    const total = Math.max(stats.total, 1);
    const pOpen = Math.round((stats.open / total) * 100);
    const pProg = Math.round((stats.inProgress / total) * 100);
    const pRes = Math.round((stats.resolved / total) * 100);
    const pClosed = Math.round((stats.closed / total) * 100);
    
    const degOpen = (stats.open / total) * 360;
    const degProg = (stats.inProgress / total) * 360;
    const degRes = (stats.resolved / total) * 360;
    
    document.getElementById('ticketPieChart').style.background = `conic-gradient(
        #0d6efd 0deg ${degOpen}deg, 
        #ffc107 ${degOpen}deg ${degOpen + degProg}deg, 
        #198754 ${degOpen + degProg}deg ${degOpen + degProg + degRes}deg, 
        #6c757d ${degOpen + degProg + degRes}deg 360deg
    )`;
    
    document.getElementById('pieLegends').innerHTML = `
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#0d6efd"></span> Open (${pOpen}%)</div>
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#ffc107"></span> Progress (${pProg}%)</div>
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#198754"></span> Resolved (${pRes}%)</div>
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#6c757d"></span> Closed (${pClosed}%)</div>
    `;

    // Update Bar Chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const mockData = [
        Math.floor(stats.total * 0.15),
        Math.floor(stats.total * 0.25),
        Math.floor(stats.total * 0.12),
        Math.floor(stats.total * 0.38),
        Math.floor(stats.total * 0.22),
        Math.floor(stats.total * 0.30)
    ].map(v => v === 0 ? 5 : v); // Ensure some height
    
    const maxVal = Math.max(...mockData, 10);
    
    document.getElementById('activityBarChart').innerHTML = mockData.map((val, i) => `
        <div class="css-bar" style="height: ${(val / maxVal) * 100}%">
            <span>${months[i]}</span>
            <small>${val}</small>
        </div>
    `).join('');

    // Update Recent Tickets
    const tickets = DB.getTickets().slice(0, 5); // Get latest 5
    const getBadgeClass = (val) => {
        const map = {
            'High': 'danger', 'Critical': 'danger', 'Medium': 'warning', 'Low': 'secondary',
            'Open': 'primary', 'In Progress': 'warning', 'Resolved': 'success', 'Closed': 'dark'
        };
        return map[val] || 'secondary';
    };
    
    const formatStatus = (s) => `<span class="badge bg-${getBadgeClass(s)} bg-opacity-10 text-${getBadgeClass(s)} border border-${getBadgeClass(s)} border-opacity-25 rounded-pill px-2">${s}</span>`;
    
    document.getElementById('recentTicketsBody').innerHTML = tickets.length ? tickets.map(t => `
        <tr>
            <td class="ps-4 fw-bold">${t.id}</td>
            <td>${t.subject}</td>
            <td>${t.category}</td>
            <td>${formatStatus(t.priority)}</td>
            <td>${formatStatus(t.status)}</td>
            <td>${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
            <td>${t.assignee}</td>
            <td class="pe-4">
                <a href="tickets.html?view=${t.id}" class="btn btn-sm btn-light"><i class="bi bi-eye"></i></a>
            </td>
        </tr>
    `).join('') : '<tr><td colspan="8" class="text-center text-muted py-4">No recent tickets found.</td></tr>';
}
