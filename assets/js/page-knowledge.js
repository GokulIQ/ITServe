document.addEventListener('DOMContentLoaded', () => {
    const mainContent = `
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h3 class="fw-bold mb-0">Knowledge Base</h3>
            <button class="btn btn-primary" onclick="showToast('Create Article modal opened', 'info')"><i class="bi bi-plus-lg me-1"></i> Create Article</button>
        </div>
        
        <div class="row mb-5 justify-content-center">
            <div class="col-lg-8">
                <div class="input-group input-group-lg shadow-sm">
                    <span class="input-group-text border-end-0"><i class="bi bi-search text-primary"></i></span>
                    <input type="text" class="form-control border-start-0 ps-0" id="searchKB" placeholder="Search for answers, guides, or troubleshooting steps...">
                </div>
            </div>
        </div>
        
        <div class="row g-4" id="kbCategories">
            <!-- Category filters -->
        </div>
        
        <hr class="my-5 border-secondary border-opacity-25">
        
        <h5 class="fw-bold mb-4">Popular Articles</h5>
        <div class="row g-4" id="kbArticles">
            <!-- Articles -->
        </div>
    `;

    renderDashboardLayout(mainContent, 'knowledge');
    initKBPage();
});

function initKBPage() {
    const kb = DB.getKB();
    
    // Get unique categories
    const categories = [...new Set(kb.map(a => a.category))];
    
    const icons = {
        'Account': 'person-badge', 'Network': 'wifi', 'Hardware': 'pc-display',
        'Software': 'window-desktop', 'General': 'info-circle', 'Security': 'shield-lock',
        'AV Equipment': 'projector'
    };
    
    document.getElementById('kbCategories').innerHTML = categories.map(cat => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="chart-box text-center kb-card h-100 p-3" onclick="filterKB('${cat}')">
                <i class="bi bi-${icons[cat] || 'folder'} display-6 text-primary mb-2 d-block"></i>
                <h6 class="fw-bold mb-0">${cat}</h6>
                <span class="small text-muted">${kb.filter(a => a.category === cat).length} articles</span>
            </div>
        </div>
    `).join('');
    
    renderArticles(kb);
    
    document.getElementById('searchKB').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = kb.filter(a => a.title.toLowerCase().includes(query) || a.category.toLowerCase().includes(query));
        renderArticles(filtered);
    });
}

window.filterKB = function(category) {
    document.getElementById('searchKB').value = category;
    const filtered = DB.getKB().filter(a => a.category === category);
    renderArticles(filtered);
};

function renderArticles(articles) {
    const sorted = [...articles].sort((a, b) => b.views - a.views);
    
    document.getElementById('kbArticles').innerHTML = sorted.length ? sorted.map(a => `
        <div class="col-md-6 col-xl-4">
            <div class="chart-box h-100 kb-card position-relative" onclick="showToast('Viewing article: ${a.title}', 'info')">
                <div class="d-flex justify-content-between mb-2">
                    <span class="badge bg-primary bg-opacity-10 text-primary">${a.category}</span>
                    <span class="text-muted small"><i class="bi bi-eye me-1"></i>${a.views}</span>
                </div>
                <h6 class="fw-bold lh-base">${a.title}</h6>
                <div class="text-muted small mt-3">
                    <i class="bi bi-calendar3 me-1"></i> Updated ${new Date(a.date).toLocaleDateString()}
                </div>
            </div>
        </div>
    `).join('') : '<div class="col-12 text-center text-muted py-5">No articles found matching your search.</div>';
}
