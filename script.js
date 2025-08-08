// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
if (window.IntersectionObserver) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe work items and service items
    document.querySelectorAll('.work-item, .service-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Case study detail page population (for case-study.html)
document.addEventListener('DOMContentLoaded', function() {
    const caseRoot = document.querySelector('[data-case-root]');
    if (!caseRoot) return;

    const params = new URLSearchParams(window.location.search);
    const project = params.get('project') || '';

    const data = {
        'palate': {
            title: 'Palate Logo Design',
            category: 'Branding & Identity',
            image: 'images/palate-logo.png',
            description: 'A clean, modern logo exploration focusing on taste, balance, and culinary craftsmanship. This placeholder case study outlines the challenge, process, and final outcome.'
        },
        'bar-kada': {
            title: 'Bar-Kada Hospitality',
            category: 'Logo Design',
            image: 'images/bar-kada-logo.jpg',
            description: 'Hospitality brand mark emphasizing warmth, community, and elevated service. This placeholder includes discovery, sketches, and refined wordmark development.'
        },
        'revitalize': {
            title: 'Revitalize IV Solutions',
            category: 'Logo Design',
            image: 'images/revitalize-logo.jpg',
            description: 'Healthcare-oriented identity reflecting clarity, renewal, and approachable care. Placeholder narrative with concept directions and rationale.'
        },
        'food-fuel': {
            title: 'Food For Fuel',
            category: 'Logo Redesign',
            image: 'images/food-for-fuel-logo.jpg',
            description: 'Refreshed logo and color system designed for energy, performance, and trust. Placeholder case study covering before/after and systemization.'
        },
        'magazine': {
            title: 'Magazine Samples',
            category: 'Print Design',
            image: 'images/magazine-samples.png',
            description: 'Editorial layouts showcasing hierarchy, typography, and grid-driven compositions. Placeholder overview of spreads and typographic choices.'
        },
        'more': {
            title: 'More Work',
            category: 'Portfolio Collection',
            image: 'images/profile.png',
            description: 'A curated selection of additional projects spanning branding and print design. Placeholder gallery and short write-ups.'
        }
    };

    const fallback = {
        title: 'Project',
        category: 'Case Study',
        image: '',
        description: 'Detailed case study coming soon. This placeholder describes the goals, approach, and outcomes for the selected project.'
    };

    const model = data[project] || fallback;

    const titleEl = document.querySelector('[data-case-title]');
    const subtitleEl = document.querySelector('[data-case-subtitle]');
    const imageEl = document.querySelector('[data-case-image]');
    const bodyEl = document.querySelector('[data-case-body]');

    if (titleEl) titleEl.textContent = model.title;
    if (subtitleEl) subtitleEl.textContent = model.category;
    if (imageEl) {
        if (model.image) {
            imageEl.src = model.image;
            imageEl.alt = model.title;
            imageEl.style.display = 'block';
        } else {
            imageEl.removeAttribute('src');
            imageEl.alt = '';
            imageEl.style.display = 'none';
        }
    }
    if (bodyEl) {
        bodyEl.innerHTML = '' +
            '<h3>Overview</h3>' +
            `<p>${model.description}</p>` +
            '<h3>Process</h3>' +
            '<p>Research, moodboards, sketching, vector exploration, refinement, and delivery.</p>' +
            '<h3>Outcomes</h3>' +
            '<p>Clear visual identity, consistent system, and memorable brand touchpoints.</p>';
    }
});