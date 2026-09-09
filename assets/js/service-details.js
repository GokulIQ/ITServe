const servicesData = {
    "computer-repair": {
        title: "Computer Repair",
        heroTitle: "Expert Computer Repair Services",
        image: "assets/images/Computer Repair.jpg",
        price: "₹499",
        duration: "1–6 Hours",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>We provide comprehensive desktop diagnostics and repair services. From hardware replacements like RAM upgrades and SSD installations to motherboard troubleshooting, power supply issues, operating system problems, and overall performance optimization, our certified technicians ensure your computer runs like new.</p>",
        features: [
            "Hardware Diagnostics & Replacement",
            "RAM & SSD Upgrades",
            "Motherboard Troubleshooting",
            "OS & Software Optimization"
        ],
        benefits: [
            "Improved system performance and speed",
            "Extended lifespan of your desktop",
            "Data safety and reliable operation",
            "Reduced downtime with quick repairs"
        ],
        process: [
            { step: "1", title: "Diagnostic check", desc: "Complete system analysis to identify hardware and software issues." },
            { step: "2", title: "Repair estimation", desc: "Transparent quote provided for required parts and labor." },
            { step: "3", title: "Expert repair", desc: "Professional repair using high-quality components." },
            { step: "4", title: "Testing & delivery", desc: "Rigorous performance testing before returning your computer." }
        ],
        faq: [
            { q: "Do you use original replacement parts?", a: "Yes, we source original or OEM-certified high-quality parts for all repairs." },
            { q: "Will I lose my data during the repair?", a: "We prioritize data safety and recommend a backup before any major repair, though most hardware fixes do not affect data." }
        ]
    },
    "laptop-repair": {
        title: "Laptop Repair",
        heroTitle: "Professional Laptop Repair",
        image: "assets/images/Laptop Repair.jpg",
        price: "₹799",
        duration: "2–8 Hours",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>Our laptop repair services cover everything from screen and keyboard replacements to battery issues, charging-port repairs, and complex motherboard level troubleshooting. We also address overheating problems and software glitches to get your laptop functioning perfectly again.</p>",
        features: [
            "Screen & Keyboard Replacement",
            "Battery & Charging Port Repair",
            "Motherboard Level Repair",
            "Overheating Solutions"
        ],
        benefits: [
            "Quick turnaround for essential devices",
            "Quality components for longevity",
            "Expertise in all major laptop brands",
            "Thermal optimization for better performance"
        ],
        process: [
            { step: "1", title: "Initial inspection", desc: "Detailed inspection to find physical and internal faults." },
            { step: "2", title: "Quotation", desc: "Clear pricing for the necessary replacement parts." },
            { step: "3", title: "Component repair/replacement", desc: "Careful installation of new screens, batteries, or other components." },
            { step: "4", title: "Quality check", desc: "Testing all laptop functions before handoff." }
        ],
        faq: [
            { q: "How long does a screen replacement take?", a: "Screen replacements typically take 2-4 hours, provided the part is in stock." },
            { q: "Can you fix water-damaged laptops?", a: "Yes, we specialize in liquid damage recovery and motherboard repair." }
        ]
    },
    "annual-maintenance": {
        title: "Annual Maintenance (AMC)",
        heroTitle: "Comprehensive AMC Contracts",
        image: "assets/images/Annual Maintenance (AMC).jpg",
        price: "₹2,999/year",
        duration: "Annual Contract",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>Our Annual Maintenance Contracts (AMC) provide peace of mind through preventive maintenance, hardware inspections, software updates, and continuous system health monitoring. With unlimited support and scheduled maintenance, we keep your business IT infrastructure secure and efficient.</p>",
        features: [
            "Preventive & Scheduled Maintenance",
            "Hardware & Software Inspections",
            "System Health Monitoring",
            "Unlimited Priority Support"
        ],
        benefits: [
            "Predictable IT maintenance costs",
            "Minimized risk of sudden hardware failure",
            "Priority response for urgent issues",
            "Continuous security and performance updates"
        ],
        process: [
            { step: "1", title: "Infrastructure Audit", desc: "Initial assessment of your IT setup." },
            { step: "2", title: "Contract Customization", desc: "Tailoring the AMC to suit your business needs." },
            { step: "3", title: "Scheduled Visits", desc: "Regular check-ups and preventive maintenance." },
            { step: "4", title: "On-demand Support", desc: "Rapid response to any unexpected IT problems." }
        ],
        faq: [
            { q: "What is included in the AMC?", a: "Our AMC covers preventive maintenance, routine check-ups, unlimited remote support, and priority on-site visits." },
            { q: "Are replacement parts included?", a: "Standard AMCs cover service and maintenance; replacement hardware parts are usually billed separately." }
        ]
    },
    "network-setup": {
        title: "Network Setup & Troubleshooting",
        heroTitle: "Reliable Network Infrastructure",
        image: "assets/images/Network Setup.jpg",
        price: "₹1,499",
        duration: "2–24 Hours",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>We design and implement robust network solutions including LAN and Wi-Fi setup, router and switch configuration, structured cabling, and IP configuration. Our team also provides expert network troubleshooting and security implementation to ensure seamless connectivity.</p>",
        features: [
            "LAN & Wi-Fi Setup",
            "Router & Switch Configuration",
            "Structured Cabling",
            "Network Security & Troubleshooting"
        ],
        benefits: [
            "Stable and fast internet connectivity",
            "Secure data transfer across the network",
            "Scalable infrastructure for business growth",
            "Reduced network downtime"
        ],
        process: [
            { step: "1", title: "Site Survey", desc: "Analyzing your workspace for optimal network layout." },
            { step: "2", title: "Design & Planning", desc: "Creating a customized network architecture plan." },
            { step: "3", title: "Installation & Cabling", desc: "Setting up cables, routers, and access points." },
            { step: "4", title: "Configuration & Testing", desc: "Securing the network and ensuring maximum speed." }
        ],
        faq: [
            { q: "Can you expand an existing network?", a: "Yes, we can seamlessly integrate new access points and switches into your current setup." },
            { q: "Do you provide network security?", a: "Absolutely. We configure firewalls and secure Wi-Fi protocols as part of our setup." }
        ]
    },
    "server-support": {
        title: "Server Support",
        heroTitle: "Expert Server Administration",
        image: "assets/images/Server Maintenance.jpg",
        price: "₹1,999",
        duration: "2–24 Hours",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>Our server support encompasses complete server installation, configuration, monitoring, and troubleshooting. We manage backups, optimize storage, enhance performance, and fortify server security to keep your critical business data accessible and safe.</p>",
        features: [
            "Server Installation & Configuration",
            "24/7 Monitoring & Maintenance",
            "Backup & Storage Management",
            "Performance & Security Optimization"
        ],
        benefits: [
            "High availability of business applications",
            "Robust data protection and backup",
            "Optimized resource utilization",
            "Proactive issue resolution before downtime occurs"
        ],
        process: [
            { step: "1", title: "Requirement Analysis", desc: "Understanding your server needs and workload." },
            { step: "2", title: "Deployment", desc: "Installing OS, applications, and configuring security." },
            { step: "3", title: "Monitoring Setup", desc: "Implementing tools for real-time performance tracking." },
            { step: "4", title: "Ongoing Maintenance", desc: "Regular patching, backups, and health checks." }
        ],
        faq: [
            { q: "Do you support both Windows and Linux servers?", a: "Yes, our engineers are proficient in both Windows Server and Linux environments." },
            { q: "How often are backups performed?", a: "We configure automated backups based on your business requirements, typically daily or hourly." }
        ]
    },
    "it-support": {
        title: "24/7 IT Support",
        heroTitle: "Always-On Technical Support",
        image: "assets/images/Emergency IT Support.jpg",
        price: "₹999/month",
        duration: "24/7 Support",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>We offer round-the-clock IT helpdesk and emergency troubleshooting. Whether it's remote assistance, system monitoring, software support, or business IT consulting, our dedicated team is always available to ensure your operations never stop.</p>",
        features: [
            "24/7 Remote & On-site Support",
            "Emergency Troubleshooting",
            "Continuous System Monitoring",
            "Comprehensive Hardware & Software Assistance"
        ],
        benefits: [
            "Immediate resolution of critical IT issues",
            "Minimal business interruption",
            "Access to expert IT professionals anytime",
            "Peace of mind knowing support is always available"
        ],
        process: [
            { step: "1", title: "Onboarding", desc: "Setting up secure remote access and monitoring tools." },
            { step: "2", title: "24/7 Monitoring", desc: "Proactively tracking system alerts and network health." },
            { step: "3", title: "Issue Resolution", desc: "Immediate response to helpdesk tickets and alerts." },
            { step: "4", title: "Monthly Reporting", desc: "Detailed reports on system health and resolved issues." }
        ],
        faq: [
            { q: "How do I contact support in an emergency?", a: "You get access to a dedicated 24/7 hotline and a priority ticketing portal." },
            { q: "Is on-site support included?", a: "Our 24/7 plan primarily covers remote support, with rapid on-site dispatch available when necessary." }
        ]
    },
    "data-backup": {
        title: "Data Backup & Recovery",
        heroTitle: "Secure Your Critical Data",
        image: "assets/images/Data Backup & Recovery.jpg",
        price: "₹1,999",
        duration: "Varies",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>Automated cloud backups, NAS setup, and emergency data recovery from crashed drives. We ensure your data is safe and recoverable in the event of hardware failure or accidental deletion.</p>",
        features: ["Cloud & Local Backups", "Disaster Recovery Planning", "Data Restoration", "Ransomware Protection"],
        benefits: ["Prevent data loss", "Ensure business continuity", "Secure sensitive information", "Quick recovery times"],
        process: [
            { step: "1", title: "Assessment", desc: "Evaluating your data storage and backup needs." },
            { step: "2", title: "Implementation", desc: "Setting up automated backup solutions." },
            { step: "3", title: "Testing", desc: "Verifying backup integrity and restoration processes." },
            { step: "4", title: "Monitoring", desc: "Ongoing checks to ensure backups run successfully." }
        ],
        faq: [
            { q: "Can you recover data from a dead hard drive?", a: "In many cases, yes. We use advanced techniques to recover data from failing drives." }
        ]
    },
    "cybersecurity": {
        title: "Cybersecurity Support",
        heroTitle: "Protect Your Digital Assets",
        image: "assets/images/Cybersecurity Support.jpg",
        price: "₹999",
        duration: "Varies",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>Comprehensive cybersecurity services including antivirus installation, malware removal, firewall configuration, and vulnerability audits to safeguard your business against evolving threats.</p>",
        features: ["Malware & Virus Removal", "Firewall Setup", "Security Audits", "Employee Training"],
        benefits: ["Protect against cyber attacks", "Secure customer data", "Maintain regulatory compliance", "Minimize risk of breaches"],
        process: [
            { step: "1", title: "Audit", desc: "Identifying vulnerabilities in your current setup." },
            { step: "2", title: "Securing", desc: "Deploying firewalls and endpoint protection." },
            { step: "3", title: "Monitoring", desc: "Continuous threat detection and response." },
            { step: "4", title: "Review", desc: "Regular security assessments and updates." }
        ],
        faq: [
            { q: "What should I do if I suspect a data breach?", a: "Contact us immediately. We provide rapid incident response to contain and mitigate breaches." }
        ]
    },
    "remote-support": {
        title: "Remote IT Support",
        heroTitle: "Instant Remote Assistance",
        image: "assets/images/Remote IT Support.jpg",
        price: "₹299",
        duration: "Immediate",
        availability: "Available Now",
        description: "<p class='text-secondary mb-4'>Fast and efficient remote IT support for software troubleshooting, email configuration, and system optimization using secure remote access tools.</p>",
        features: ["Instant Troubleshooting", "Software Installation", "Email Setup", "Performance Tuning"],
        benefits: ["Fast issue resolution", "No waiting for a technician to arrive", "Cost-effective support", "Secure connections"],
        process: [
            { step: "1", title: "Connect", desc: "Establishing a secure remote connection to your device." },
            { step: "2", title: "Diagnose", desc: "Identifying the software or configuration issue." },
            { step: "3", title: "Resolve", desc: "Fixing the problem efficiently." },
            { step: "4", title: "Verify", desc: "Ensuring the issue is fully resolved before disconnecting." }
        ],
        faq: [
            { q: "Is remote access safe?", a: "Yes, we use industry-standard secure remote access tools, and you have full visibility of the session." }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    
    const mainContent = document.getElementById("sd-main-content");
    const sidebar = document.getElementById("sd-sidebar");

    if (!serviceId || !servicesData[serviceId]) {
        // Handle Invalid / Missing ID gracefully
        document.getElementById("sd-hero-title").innerText = "Service Not Found";
        document.getElementById("sd-breadcrumb").innerText = "Not Found";
        
        mainContent.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-exclamation-triangle text-warning display-1 mb-3"></i>
                <h2 class="fw-bold mb-3">Service Not Found</h2>
                <p class="text-secondary mb-4">The service you are looking for does not exist or has been removed.</p>
                <a href="services.html" class="btn btn-primary">Back to Services</a>
            </div>
        `;
        sidebar.style.display = 'none';
        return;
    }

    const service = servicesData[serviceId];

    // Populate Data
    document.title = service.title + " - ITServe";
    document.getElementById("sd-hero-title").innerText = service.heroTitle;
    document.getElementById("sd-breadcrumb").innerText = service.title;
    
    document.getElementById("sd-title").innerText = service.title;
    document.getElementById("sd-description").innerHTML = service.description;
    
    const imgEl = document.getElementById("sd-image");
    imgEl.src = service.image;
    imgEl.alt = service.title;
    imgEl.style.display = "block";
    
    document.getElementById("sd-price").innerText = service.price;
    document.getElementById("sd-duration").innerText = service.duration;
    document.getElementById("sd-availability").innerText = service.availability;

    // Features
    const featuresContainer = document.getElementById("sd-features");
    featuresContainer.innerHTML = "";
    service.features.forEach(feature => {
        featuresContainer.innerHTML += `
            <div class="col-md-6">
                <div class="d-flex align-items-center gap-3 bg-surface p-3 rounded shadow-sm border">
                    <i class="bi bi-check-circle-fill text-primary fs-5"></i>
                    <span class="fw-medium">${feature}</span>
                </div>
            </div>
        `;
    });

    // Benefits
    const benefitsContainer = document.getElementById("sd-benefits");
    benefitsContainer.innerHTML = "";
    if (service.benefits && service.benefits.length > 0) {
        document.getElementById("sd-benefits-heading").classList.remove("d-none");
        service.benefits.forEach(benefit => {
            benefitsContainer.innerHTML += `
                <div class="col-md-6">
                    <div class="d-flex align-items-center gap-3 bg-surface p-3 rounded shadow-sm border">
                        <i class="bi bi-star-fill text-warning fs-5"></i>
                        <span class="fw-medium">${benefit}</span>
                    </div>
                </div>
            `;
        });
    }

    // Process Timeline
    const processContainer = document.getElementById("sd-process");
    processContainer.innerHTML = "";
    service.process.forEach(proc => {
        processContainer.innerHTML += `
            <div class="d-flex mb-4">
                <div class="flex-shrink-0">
                    <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-weight: bold;">
                        ${proc.step}
                    </div>
                </div>
                <div class="ms-3">
                    <h6 class="fw-bold mb-1">${proc.title}</h6>
                    <p class="text-secondary mb-0 small">${proc.desc}</p>
                </div>
            </div>
        `;
    });

    // FAQ Accordion
    const faqContainer = document.getElementById("serviceFaq");
    faqContainer.innerHTML = "";
    service.faq.forEach((faqItem, index) => {
        const isExpanded = index === 0 ? "true" : "false";
        const collapseClass = index === 0 ? "show" : "";
        const buttonClass = index === 0 ? "" : "collapsed";
        
        faqContainer.innerHTML += `
            <div class="accordion-item border mb-3 rounded overflow-hidden">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button fw-bold bg-surface ${buttonClass}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${isExpanded}" aria-controls="collapse${index}">
                        ${faqItem.q}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse ${collapseClass}" aria-labelledby="heading${index}" data-bs-parent="#serviceFaq">
                    <div class="accordion-body text-secondary">
                        ${faqItem.a}
                    </div>
                </div>
            </div>
        `;
    });

    // Related Services (Exclude current one)
    const relatedContainer = document.getElementById("sd-related-services");
    relatedContainer.innerHTML = "";
    
    // Pick 3 random or next services to show
    let relatedKeys = Object.keys(servicesData).filter(key => key !== serviceId);
    // shuffle array
    relatedKeys = relatedKeys.sort(() => 0.5 - Math.random()).slice(0, 4);

    relatedKeys.forEach(key => {
        const relService = servicesData[key];
        relatedContainer.innerHTML += `
            <li class="mb-2">
                <a href="service-details.html?id=${key}" class="d-flex align-items-center text-decoration-none text-dark hover-primary p-2 rounded bg-surface border transition-all">
                    <i class="bi bi-arrow-right-short text-primary fs-4 me-2"></i>
                    <span class="fw-medium">${relService.title}</span>
                </a>
            </li>
        `;
    });
});
