// ==========================================================================
// Ticket Management
// ==========================================================================

function loadTickets() {
    return getStorage(STORAGE_KEYS.TICKETS) || [];
}

function saveTicket(ticket) {
    const tickets = loadTickets();
    tickets.unshift(ticket); // Add to beginning
    setStorage(STORAGE_KEYS.TICKETS, tickets);
}

function getTicketById(id) {
    const tickets = loadTickets();
    return tickets.find(t => t.id === id);
}

// Render tickets table
function renderTicketsTable(containerId, limit = null, statusFilter = 'All') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let tickets = loadTickets();
    
    if (statusFilter !== 'All') {
        tickets = tickets.filter(t => t.status === statusFilter);
    }
    
    if (limit) {
        tickets = tickets.slice(0, limit);
    }
    
    if (tickets.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4">
                    <div class="empty-state text-muted">
                        <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                        No support tickets found.
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    tickets.forEach(ticket => {
        let priorityClass = 'badge-soft-primary';
        if (ticket.priority === 'High' || ticket.priority === 'Critical') priorityClass = 'badge-soft-danger';
        else if (ticket.priority === 'Medium') priorityClass = 'badge-soft-warning';
        
        let statusClass = 'bg-secondary';
        if (ticket.status === 'Resolved' || ticket.status === 'Closed') statusClass = 'bg-success';
        else if (ticket.status === 'In Progress') statusClass = 'bg-primary';
        else if (ticket.status === 'Waiting for Customer') statusClass = 'bg-warning text-dark';
        
        html += `
            <tr>
                <td><strong>${ticket.id}</strong></td>
                <td>${ticket.subject}</td>
                <td>${ticket.category}</td>
                <td><span class="badge ${priorityClass}">${ticket.priority}</span></td>
                <td>${ticket.date}</td>
                <td>${ticket.engineer || 'Unassigned'}</td>
                <td><span class="badge ${statusClass}">${ticket.status}</span></td>
                <td>
                    <a href="ticket-details.html?id=${ticket.id}" class="btn btn-sm btn-outline-primary">View</a>
                </td>
            </tr>
        `;
    });
    
    container.innerHTML = html;
}

// Setup Ticket Form
document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('raiseTicketForm');
    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic client-side validation
            if (!ticketForm.checkValidity()) {
                e.stopPropagation();
                ticketForm.classList.add('was-validated');
                return;
            }
            
            const formData = new FormData(ticketForm);
            const date = new Date();
            const dateString = date.toISOString().split('T')[0];
            
            const newTicket = {
                id: 'TKT-' + date.getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000),
                subject: formData.get('subject'),
                category: formData.get('category'),
                priority: formData.get('priority'),
                status: 'Open',
                date: dateString,
                engineer: 'Unassigned',
                description: formData.get('description'),
                deviceType: formData.get('deviceType'),
                deviceId: formData.get('deviceId')
            };
            
            saveTicket(newTicket);
            
            // Add notification
            const notifs = getStorage(STORAGE_KEYS.NOTIFICATIONS) || [];
            notifs.unshift({
                id: Date.now(),
                text: \`You raised a new ticket: \${newTicket.id}\`,
                date: 'Just now',
                read: false
            });
            setStorage(STORAGE_KEYS.NOTIFICATIONS, notifs);
            
            showToast('Ticket created successfully!', 'success');
            
            setTimeout(() => {
                window.location.href = 'tickets.html';
            }, 1500);
        });
    }
});
