document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h3 class="fw-bold mb-0">Assets Management</h3>
            <button class="btn btn-primary" onclick="openAssetModal()"><i class="bi bi-plus-lg me-1"></i> Add New Asset</button>
        </div>
        
        <div class="chart-box p-0 overflow-hidden">
            <div class="p-4 border-bottom bg-light">
                <div class="row g-3">
                    <div class="col-md-5">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search text-muted"></i></span>
                            <input type="text" class="form-control" id="searchAsset" placeholder="Search by name, serial, or user...">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="filterType">
                            <option value="">All Types</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Monitor">Monitor</option>
                            <option value="Printer">Printer</option>
                            <option value="Network">Network</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="filterAssetStatus">
                            <option value="">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Available">Available</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Retired">Retired</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light text-secondary">
                        <tr>
                            <th class="ps-4">Asset ID</th>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Serial Number</th>
                            <th>Assigned User</th>
                            <th>Status</th>
                            <th class="pe-4 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody class="border-top-0" id="assetsBody">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    renderDashboardLayout(mainContent, 'assets');
    initAssetsPage();
});

let assetModal;

function initAssetsPage() {
    assetModal = new bootstrap.Modal(document.getElementById('assetModal'));
    
    document.getElementById('searchAsset').addEventListener('input', loadAssets);
    document.getElementById('filterType').addEventListener('change', loadAssets);
    document.getElementById('filterAssetStatus').addEventListener('change', loadAssets);
    
    document.getElementById('saveAssetBtn').addEventListener('click', saveAsset);
    
    loadAssets();
}

function loadAssets() {
    let assets = DB.getAssets();
    
    const search = document.getElementById('searchAsset').value.toLowerCase();
    const type = document.getElementById('filterType').value;
    const status = document.getElementById('filterAssetStatus').value;
    
    assets = assets.filter(a => {
        const matchSearch = a.name.toLowerCase().includes(search) || a.serial.toLowerCase().includes(search) || a.user.toLowerCase().includes(search);
        const matchType = type ? a.type === type : true;
        const matchStatus = status ? a.status === status : true;
        return matchSearch && matchType && matchStatus;
    });
    
    const getBadgeClass = (val) => {
        const map = { 'Active': 'success', 'Available': 'primary', 'Maintenance': 'warning', 'Retired': 'secondary' };
        return map[val] || 'secondary';
    };
    const formatStatus = (s) => `<span class="badge bg-${getBadgeClass(s)} bg-opacity-10 text-${getBadgeClass(s)} border border-${getBadgeClass(s)} border-opacity-25 rounded-pill px-2">${s}</span>`;
    
    const tbody = document.getElementById('assetsBody');
    if(assets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-5">No assets found.</td></tr>';
    } else {
        tbody.innerHTML = assets.map(a => `
            <tr>
                <td class="ps-4 fw-bold text-muted">${a.id}</td>
                <td class="fw-medium">${a.name}</td>
                <td><i class="bi bi-${getIconForType(a.type)} text-secondary me-2"></i>${a.type}</td>
                <td class="font-monospace small">${a.serial}</td>
                <td>${a.user || '<span class="text-muted fst-italic">Unassigned</span>'}</td>
                <td>${formatStatus(a.status)}</td>
                <td class="pe-4 text-end">
                    <button class="btn btn-sm btn-light me-1" onclick="openAssetModal('${a.id}')" title="Edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteAsset('${a.id}')" title="Delete"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }
}

function getIconForType(type) {
    const map = {
        'Laptop': 'laptop', 'Desktop': 'pc-display', 'Monitor': 'display', 
        'Printer': 'printer', 'Network': 'router', 'Tablet': 'tablet'
    };
    return map[type] || 'box';
}

window.openAssetModal = function(id = null) {
    const form = document.getElementById('assetForm');
    form.reset();
    form.classList.remove('was-validated');
    
    if (id) {
        document.getElementById('assetModalLabel').innerText = 'Edit Asset';
        const a = DB.getAssets().find(x => x.id === id);
        if (a) {
            document.getElementById('assetId').value = a.id;
            document.getElementById('assetName').value = a.name;
            document.getElementById('assetType').value = a.type;
            document.getElementById('assetSerial').value = a.serial;
            document.getElementById('assetUser').value = a.user;
            document.getElementById('assetStatus').value = a.status;
        }
    } else {
        document.getElementById('assetModalLabel').innerText = 'Add New Asset';
        document.getElementById('assetId').value = '';
    }
    
    assetModal.show();
};

function saveAsset() {
    const form = document.getElementById('assetForm');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    const id = document.getElementById('assetId').value || ('AST-' + Math.floor(100 + Math.random() * 900));
    
    const newAsset = {
        id,
        name: document.getElementById('assetName').value,
        type: document.getElementById('assetType').value,
        serial: document.getElementById('assetSerial').value,
        user: document.getElementById('assetUser').value,
        status: document.getElementById('assetStatus').value
    };
    
    DB.saveAsset(newAsset);
    assetModal.hide();
    showToast(`Asset ${id} saved successfully.`);
    loadAssets();
}

window.deleteAsset = function(id) {
    if(confirm(`Are you sure you want to delete Asset ${id}?`)) {
        DB.deleteAsset(id);
        showToast(`Asset ${id} deleted successfully.`, 'danger');
        loadAssets();
    }
};
