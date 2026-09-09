document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h3 class="fw-bold mb-0">My Tickets</h3>
            <a href="create-ticket.html" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i> Create New Ticket</a>
        </div>
        
        <div class="chart-box p-0 overflow-hidden">
            <div class="p-4 border-bottom bg-light">
                <div class="row g-3">
                    <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search text-muted"></i></span>
                            <input type="text" class="form-control" id="searchTicket" placeholder="Search tickets...">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="filterStatus">
                            <option value="">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="filterPriority">
                            <option value="">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-light w-100" id="resetFilters">Reset</button>
                    </div>
                </div>
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
                            <th class="pe-4 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody class="border-top-0" id="ticketsBody">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
            </div>
            
            <div class="p-4 border-top d-flex justify-content-between align-items-center flex-wrap gap-3">
                <span class="text-muted small" id="paginationInfo">Showing 1 to 10 of X entries</span>
                <nav>
                    <ul class="pagination pagination-sm mb-0" id="paginationControls">
                        <!-- Populated by JS -->
                    </ul>
                </nav>
            </div>
        </div>
    `;

    renderDashboardLayout(mainContent, 'tickets');
    
    initTicketsPage();

    const msg = sessionStorage.getItem('toastMessage');
    if (msg) {
        showToast(msg, 'success');
        sessionStorage.removeItem('toastMessage');
    }

});

let currentPage = 1;
const itemsPerPage = 10;
let filteredTickets = [];

function initTicketsPage() {
    loadAndFilterTickets();
    
    document.getElementById('searchTicket').addEventListener('input', () => { currentPage = 1; loadAndFilterTickets(); });
    document.getElementById('filterStatus').addEventListener('change', () => { currentPage = 1; loadAndFilterTickets(); });
    document.getElementById('filterPriority').addEventListener('change', () => { currentPage = 1; loadAndFilterTickets(); });
    
    document.getElementById('resetFilters').addEventListener('click', () => {
        document.getElementById('searchTicket').value = '';
        document.getElementById('filterStatus').value = '';
        document.getElementById('filterPriority').value = '';
        currentPage = 1;
        loadAndFilterTickets();
    });

    document.getElementById('saveTicketBtn').addEventListener('click', () => {
        const id = document.getElementById('editId').value;
        const status = document.getElementById('editStatus').value;
        const priority = document.getElementById('editPriority').value;
        
        const tickets = DB.getTickets();
        const t = tickets.find(x => x.id === id);
        if(t) {
            t.status = status;
            t.priority = priority;
            DB.saveTicket(t);
            bootstrap.Modal.getInstance(document.getElementById('editTicketModal')).hide();
            showToast(`Ticket ${id} updated successfully.`);
            loadAndFilterTickets();
        }
    });
}

function loadAndFilterTickets() {
    let tickets = DB.getTickets();
    
    const search = document.getElementById('searchTicket').value.toLowerCase();
    const status = document.getElementById('filterStatus').value;
    const priority = document.getElementById('filterPriority').value;
    
    filteredTickets = tickets.filter(t => {
        const matchSearch = t.subject.toLowerCase().includes(search) || t.id.toLowerCase().includes(search);
        const matchStatus = status ? t.status === status : true;
        const matchPriority = priority ? t.priority === priority : true;
        return matchSearch && matchStatus && matchPriority;
    });
    
    renderTable();
}

function renderTable() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageTickets = filteredTickets.slice(start, end);
    
    const getBadgeClass = (val) => {
        const map = {
            'High': 'danger', 'Critical': 'danger', 'Medium': 'warning', 'Low': 'secondary',
            'Open': 'primary', 'In Progress': 'warning', 'Resolved': 'success', 'Closed': 'dark'
        };
        return map[val] || 'secondary';
    };
    const formatStatus = (s) => `<span class="badge bg-${getBadgeClass(s)} bg-opacity-10 text-${getBadgeClass(s)} border border-${getBadgeClass(s)} border-opacity-25 rounded-pill px-2">${s}</span>`;
    
    const tbody = document.getElementById('ticketsBody');
    if(pageTickets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-5">No tickets found matching your criteria.</td></tr>';
    } else {
        tbody.innerHTML = pageTickets.map(t => `
            <tr>
                <td class="ps-4 fw-bold">${t.id}</td>
                <td>${t.subject}</td>
                <td>${t.category}</td>
                <td>${formatStatus(t.priority)}</td>
                <td>${formatStatus(t.status)}</td>
                <td>${new Date(t.date).toLocaleDateString()}</td>
                <td>${t.assignee}</td>
                <td class="pe-4 text-end">
                    <button class="btn btn-sm btn-light me-1" onclick="viewTicket('${t.id}')" title="View"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-sm btn-light me-1" onclick="editTicket('${t.id}')" title="Edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteTicket('${t.id}')" title="Delete"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }
    
    document.getElementById('paginationInfo').innerText = `Showing ${filteredTickets.length > 0 ? start + 1 : 0} to ${Math.min(end, filteredTickets.length)} of ${filteredTickets.length} entries`;
    
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    let pagHTML = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a></li>`;
    for(let i=1; i<=totalPages; i++) {
        pagHTML += `<li class="page-item ${currentPage === i ? 'active' : ''}"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
    }
    pagHTML += `<li class="page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}"><a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a></li>`;
    
    document.getElementById('paginationControls').innerHTML = pagHTML;
}

window.changePage = function(p) {
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    if(p >= 1 && p <= totalPages) {
        currentPage = p;
        renderTable();
    }
};

window.viewTicket = function(id) {
    const t = DB.getTickets().find(x => x.id === id);
    if(t) {
        const getBadgeClass = (val) => {
            const map = {
                'High': 'danger', 'Critical': 'danger', 'Medium': 'warning', 'Low': 'secondary',
                'Open': 'primary', 'In Progress': 'warning', 'Resolved': 'success', 'Closed': 'dark'
            };
            return map[val] || 'secondary';
        };
        const formatStatus = (s) => `<span class="badge bg-${getBadgeClass(s)} bg-opacity-10 text-${getBadgeClass(s)} border border-${getBadgeClass(s)} border-opacity-25 rounded-pill px-2">${s}</span>`;
        
        document.getElementById('viewTicketContent').innerHTML = `
            <div class="mb-3">
                <span class="text-muted small d-block">Subject</span>
                <span class="fw-bold fs-5">${t.subject}</span>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <span class="text-muted small d-block">Ticket ID</span>
                    <span>${t.id}</span>
                </div>
                <div class="col-6">
                    <span class="text-muted small d-block">Created Date</span>
                    <span>${new Date(t.date).toLocaleString()}</span>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <span class="text-muted small d-block">Status</span>
                    ${formatStatus(t.status)}
                </div>
                <div class="col-6">
                    <span class="text-muted small d-block">Priority</span>
                    ${formatStatus(t.priority)}
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <span class="text-muted small d-block">Category</span>
                    <span>${t.category}</span>
                </div>
                <div class="col-6">
                    <span class="text-muted small d-block">Assigned To</span>
                    <span>${t.assignee}</span>
                </div>
            </div>
            <div class="mb-2">
                <span class="text-muted small d-block">Description</span>
                <div class="bg-light p-3 rounded-3 mt-1">${t.description || 'No description provided.'}</div>
            </div>
        `;
        new bootstrap.Modal(document.getElementById('viewTicketModal')).show();
    }
};

window.editTicket = function(id) {
    const t = DB.getTickets().find(x => x.id === id);
    if(t) {
        document.getElementById('editId').value = t.id;
        document.getElementById('editStatus').value = t.status;
        document.getElementById('editPriority').value = t.priority;
        new bootstrap.Modal(document.getElementById('editTicketModal')).show();
    }
};

window.deleteTicket = function(id) {
    if(confirm(`Are you sure you want to delete Ticket ${id}? This will also update the dashboard statistics.`)) {
        DB.deleteTicket(id);
        showToast(`Ticket ${id} deleted successfully.`, 'danger');
        
        // Adjust pagination if deleting last item on page
        const start = (currentPage - 1) * itemsPerPage;
        if(filteredTickets.length - 1 <= start && currentPage > 1) {
            currentPage--;
        }
        
        loadAndFilterTickets();
    }
};
