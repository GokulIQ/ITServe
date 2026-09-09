document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h3 class="fw-bold mb-0">Reports & Analytics</h3>
            <div class="d-flex gap-2">
                <select class="form-select bg-light">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>This Year</option>
                </select>
                <button class="btn btn-outline-primary text-nowrap" onclick="downloadCSV()"><i class="bi bi-download me-1"></i> Export CSV</button>
            </div>
        </div>
        
        <div class="row g-4 mb-4">
            <div class="col-lg-6">
                <div class="chart-box h-100">
                    <h5 class="fw-bold mb-5">Tickets by Category</h5>
                    <div class="css-bar-chart" id="categoryBarChart">
                        <!-- Populated by JS -->
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="chart-box h-100 text-center">
                    <h5 class="fw-bold mb-4 text-start">Tickets by Priority</h5>
                    <div class="css-pie mb-4" id="priorityPieChart"></div>
                    <div class="d-flex justify-content-center flex-wrap gap-3 small fw-medium" id="priorityLegends">
                        <!-- Populated by JS -->
                    </div>
                </div>
            </div>
        </div>
        
        <div class="chart-box">
            <h5 class="fw-bold mb-4">Resolution Performance</h5>
            <div class="row text-center g-4">
                <div class="col-md-4">
                    <div class="p-4 bg-light rounded-3">
                        <h2 class="fw-bold text-primary mb-1">94%</h2>
                        <p class="text-muted small mb-0">SLA Compliance Rate</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-4 bg-light rounded-3">
                        <h2 class="fw-bold text-success mb-1">1.2 hrs</h2>
                        <p class="text-muted small mb-0">Avg. First Response Time</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-4 bg-light rounded-3">
                        <h2 class="fw-bold text-info mb-1">4.5 hrs</h2>
                        <p class="text-muted small mb-0">Avg. Resolution Time</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    renderDashboardLayout(mainContent, 'reports');
    initReportsPage();
});

function initReportsPage() {
    const tickets = DB.getTickets();
    if(tickets.length === 0) return;
    
    // Category Bar Chart
    const categories = ['Hardware', 'Software', 'Network', 'Account', 'Server', 'Other'];
    const catCounts = categories.map(cat => tickets.filter(t => t.category === cat).length);
    const maxCat = Math.max(...catCounts, 10);
    
    document.getElementById('categoryBarChart').innerHTML = catCounts.map((val, i) => `
        <div class="css-bar" style="height: ${(val / maxCat) * 100}%">
            <span>${categories[i]}</span>
            <small>${val}</small>
        </div>
    `).join('');
    
    // Priority Pie Chart
    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    const prioCounts = priorities.map(p => tickets.filter(t => t.priority === p).length);
    const total = Math.max(tickets.length, 1);
    
    const pLow = Math.round((prioCounts[0] / total) * 100);
    const pMed = Math.round((prioCounts[1] / total) * 100);
    const pHigh = Math.round((prioCounts[2] / total) * 100);
    const pCrit = Math.round((prioCounts[3] / total) * 100);
    
    const dLow = (prioCounts[0] / total) * 360;
    const dMed = (prioCounts[1] / total) * 360;
    const dHigh = (prioCounts[2] / total) * 360;
    
    document.getElementById('priorityPieChart').style.background = `conic-gradient(
        #6c757d 0deg ${dLow}deg, 
        #ffc107 ${dLow}deg ${dLow + dMed}deg, 
        #fd7e14 ${dLow + dMed}deg ${dLow + dMed + dHigh}deg, 
        #dc3545 ${dLow + dMed + dHigh}deg 360deg
    )`;
    
    document.getElementById('priorityLegends').innerHTML = `
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#6c757d"></span> Low (${pLow}%)</div>
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#ffc107"></span> Medium (${pMed}%)</div>
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#fd7e14"></span> High (${pHigh}%)</div>
        <div><span class="d-inline-block rounded-circle me-1" style="width:10px;height:10px;background:#dc3545"></span> Critical (${pCrit}%)</div>
    `;
}

window.downloadCSV = function() {
    const tickets = DB.getTickets();
    if(tickets.length === 0) return showToast('No data to export.', 'warning');
    
    const headers = ['Ticket ID', 'Subject', 'Category', 'Priority', 'Status', 'Date', 'Assignee'];
    const rows = tickets.map(t => [
        t.id, 
        `"${t.subject.replace(/"/g, '""')}"`, 
        t.category, 
        t.priority, 
        t.status, 
        t.date, 
        `"${t.assignee}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(',') + '\n' 
        + rows.map(e => e.join(',')).join('\n');
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ITServe_Tickets_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Report downloaded successfully!');
};
