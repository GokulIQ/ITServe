// ==========================================================================
// Local Database Management
// ==========================================================================

const DB_KEYS = {
    TICKETS: 'itserve_tickets',
    ASSETS: 'itserve_assets',
    KNOWLEDGE: 'itserve_knowledge',
    NOTIFICATIONS: 'itserve_notifications',
    SETTINGS: 'itserve_settings'
};

// Initialize DB with dummy data if empty
function initDB() {
    if (!localStorage.getItem(DB_KEYS.TICKETS)) {
        const dummyTickets = [
            { id: 'ITS-1001', subject: 'Laptop not connecting to Wi-Fi', category: 'Network', priority: 'High', status: 'In Progress', date: '2026-10-12T10:30:00', assignee: 'Alex Smith', description: 'User reports their ThinkPad cannot connect to the office network.' },
            { id: 'ITS-1002', subject: 'Password reset request', category: 'Account', priority: 'Medium', status: 'Open', date: '2026-10-10T14:15:00', assignee: 'Unassigned', description: 'Need to reset AD password.' },
            { id: 'ITS-1003', subject: 'Printer not working', category: 'Hardware', priority: 'Low', status: 'Resolved', date: '2026-10-08T09:00:00', assignee: 'Mike R', description: 'Printer on 2nd floor is jammed.' },
            { id: 'ITS-1004', subject: 'Software installation request', category: 'Software', priority: 'Low', status: 'Closed', date: '2026-10-05T11:20:00', assignee: 'Sarah K', description: 'Install Adobe CC.' },
            { id: 'ITS-1005', subject: 'VPN connection problem', category: 'Network', priority: 'Critical', status: 'Open', date: '2026-10-13T08:45:00', assignee: 'Unassigned', description: 'Cannot access internal servers via VPN.' },
            { id: 'ITS-1006', subject: 'Email configuration issue', category: 'Software', priority: 'Medium', status: 'In Progress', date: '2026-10-11T16:30:00', assignee: 'Alex Smith', description: 'Outlook not syncing.' },
            { id: 'ITS-1007', subject: 'System performance issue', category: 'Hardware', priority: 'High', status: 'Open', date: '2026-10-13T09:10:00', assignee: 'Unassigned', description: 'PC is very slow and freezing.' },
            { id: 'ITS-1008', subject: 'Monitor replacement', category: 'Hardware', priority: 'Medium', status: 'Resolved', date: '2026-10-07T13:00:00', assignee: 'Mike R', description: 'Flickering screen on dual setup.' },
            { id: 'ITS-1009', subject: 'Access to shared drive', category: 'Account', priority: 'Low', status: 'Closed', date: '2026-10-01T10:00:00', assignee: 'Sarah K', description: 'Need read access to Marketing folder.' },
            { id: 'ITS-1010', subject: 'Blue screen of death', category: 'Hardware', priority: 'Critical', status: 'In Progress', date: '2026-10-12T15:45:00', assignee: 'Mike R', description: 'Device crashes frequently.' },
            { id: 'ITS-1011', subject: 'Requesting new mouse', category: 'Hardware', priority: 'Low', status: 'Open', date: '2026-10-13T11:00:00', assignee: 'Unassigned', description: 'Scroll wheel is broken.' },
            { id: 'ITS-1012', subject: 'Intranet portal down', category: 'Server', priority: 'Critical', status: 'In Progress', date: '2026-10-13T07:30:00', assignee: 'Sarah K', description: '502 Bad Gateway on intranet.' },
            { id: 'ITS-1013', subject: 'Update billing software', category: 'Software', priority: 'High', status: 'Resolved', date: '2026-10-09T14:20:00', assignee: 'Alex Smith', description: 'Upgrade to v4.5.' },
            { id: 'ITS-1014', subject: 'New employee setup', category: 'Hardware', priority: 'Medium', status: 'Open', date: '2026-10-13T12:00:00', assignee: 'Unassigned', description: 'Setup desk for new hire joining Monday.' },
            { id: 'ITS-1015', subject: 'Guest Wi-Fi credentials', category: 'Network', priority: 'Low', status: 'Closed', date: '2026-10-02T09:30:00', assignee: 'Mike R', description: 'Need access for visitors.' }
        ];
        localStorage.setItem(DB_KEYS.TICKETS, JSON.stringify(dummyTickets));
    }
    
    if (!localStorage.getItem(DB_KEYS.ASSETS)) {
        const dummyAssets = [
            { id: 'AST-001', name: 'Dell XPS 15', type: 'Laptop', serial: 'DX15-9982', user: 'John Doe', status: 'Active' },
            { id: 'AST-002', name: 'MacBook Pro M2', type: 'Laptop', serial: 'MBP-8821', user: 'Jane Smith', status: 'Active' },
            { id: 'AST-003', name: 'HP LaserJet Pro', type: 'Printer', serial: 'HPL-4412', user: 'Marketing Dept', status: 'Maintenance' },
            { id: 'AST-004', name: 'Cisco Switch 24p', type: 'Network', serial: 'CSW-9912', user: 'IT Server Room', status: 'Active' },
            { id: 'AST-005', name: 'Logitech MX Master 3', type: 'Peripherals', serial: 'LMM-3341', user: 'Alex Brown', status: 'Active' },
            { id: 'AST-006', name: 'Dell UltraSharp 27', type: 'Monitor', serial: 'DUS-2788', user: 'John Doe', status: 'Active' },
            { id: 'AST-007', name: 'ThinkPad T14', type: 'Laptop', serial: 'TPT-1401', user: 'Unassigned', status: 'Available' },
            { id: 'AST-008', name: 'Epson Projector', type: 'AV Equipment', serial: 'EP-5544', user: 'Conference Room A', status: 'Active' },
            { id: 'AST-009', name: 'Apple iPad Pro', type: 'Tablet', serial: 'IP-9988', user: 'CEO', status: 'Active' },
            { id: 'AST-010', name: 'APC UPS 1500VA', type: 'Power', serial: 'APC-1500', user: 'Server Room', status: 'Retired' }
        ];
        localStorage.setItem(DB_KEYS.ASSETS, JSON.stringify(dummyAssets));
    }

    if (!localStorage.getItem(DB_KEYS.KNOWLEDGE)) {
        const dummyKB = [
            { id: 'KB-001', title: 'How to reset your AD password', category: 'Account', views: 342, date: '2026-01-15' },
            { id: 'KB-002', title: 'Connecting to the Corporate VPN', category: 'Network', views: 512, date: '2026-02-20' },
            { id: 'KB-003', title: 'Adding a network printer in Windows 11', category: 'Hardware', views: 215, date: '2026-03-10' },
            { id: 'KB-004', title: 'Setting up email on iPhone', category: 'Software', views: 890, date: '2026-04-05' },
            { id: 'KB-005', title: 'Troubleshooting slow internet', category: 'Network', views: 430, date: '2026-05-12' },
            { id: 'KB-006', title: 'Requesting software licenses', category: 'Software', views: 120, date: '2026-06-01' },
            { id: 'KB-007', title: 'Ergonomic desk setup guide', category: 'General', views: 300, date: '2026-07-22' },
            { id: 'KB-008', title: 'What to do if your laptop is stolen', category: 'Security', views: 95, date: '2026-08-14' },
            { id: 'KB-009', title: 'Using the video conferencing system', category: 'AV Equipment', views: 250, date: '2026-09-02' },
            { id: 'KB-010', title: 'Phishing email awareness', category: 'Security', views: 670, date: '2026-10-01' }
        ];
        localStorage.setItem(DB_KEYS.KNOWLEDGE, JSON.stringify(dummyKB));
    }
}

// Data Helpers
const DB = {
    get: (key) => JSON.parse(localStorage.getItem(key)) || [],
    set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    
    // Tickets
    getTickets: () => DB.get(DB_KEYS.TICKETS),
    saveTicket: (ticket) => {
        const tickets = DB.getTickets();
        const existingIndex = tickets.findIndex(t => t.id === ticket.id);
        if (existingIndex > -1) {
            tickets[existingIndex] = { ...tickets[existingIndex], ...ticket };
        } else {
            tickets.unshift(ticket);
        }
        DB.set(DB_KEYS.TICKETS, tickets);
    },
    deleteTicket: (id) => {
        let tickets = DB.getTickets();
        tickets = tickets.filter(t => t.id !== id);
        DB.set(DB_KEYS.TICKETS, tickets);
    },
    getTicketStats: () => {
        const tickets = DB.getTickets();
        return {
            total: tickets.length,
            open: tickets.filter(t => t.status === 'Open').length,
            inProgress: tickets.filter(t => t.status === 'In Progress').length,
            resolved: tickets.filter(t => t.status === 'Resolved').length,
            closed: tickets.filter(t => t.status === 'Closed').length
        };
    },

    // Assets
    getAssets: () => DB.get(DB_KEYS.ASSETS),
    saveAsset: (asset) => {
        const assets = DB.getAssets();
        const existingIndex = assets.findIndex(a => a.id === asset.id);
        if (existingIndex > -1) {
            assets[existingIndex] = { ...assets[existingIndex], ...asset };
        } else {
            assets.unshift(asset);
        }
        DB.set(DB_KEYS.ASSETS, assets);
    },
    deleteAsset: (id) => {
        let assets = DB.getAssets();
        assets = assets.filter(a => a.id !== id);
        DB.set(DB_KEYS.ASSETS, assets);
    },

    // KB
    getKB: () => DB.get(DB_KEYS.KNOWLEDGE)
};

// Auto-init
initDB();
