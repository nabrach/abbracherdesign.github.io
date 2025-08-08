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

// Project details modal
document.addEventListener('DOMContentLoaded', function() {
    const workItems = document.querySelectorAll('.work-item');
    const modal = document.getElementById('project-modal');
    if (!workItems.length || !modal) return;

    const modalDialog = modal.querySelector('.modal-dialog');
    const modalCloseButton = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalCategory = modal.querySelector('.modal-category');
    const modalDescription = modal.querySelector('.modal-description');

    const projectKeyToImage = {
        'palate': 'images/palate-logo.png',
        'bar-kada': 'images/bar-kada-logo.jpg',
        'revitalize': 'images/revitalize-logo.jpg',
        'food-fuel': 'images/food-for-fuel-logo.jpg',
        'magazine': 'images/magazine-samples.png',
        'more': 'images/profile.png'
    };

    const projectKeyToDescription = {
        'palate': 'A clean, modern logo exploration focusing on taste, balance, and culinary craftsmanship.',
        'bar-kada': 'Hospitality brand mark emphasizing warmth, community, and elevated service.',
        'revitalize': 'Healthcare-oriented identity reflecting clarity, renewal, and approachable care.',
        'food-fuel': 'Refreshed logo and color system designed for energy, performance, and trust.',
        'magazine': 'Editorial layouts showcasing hierarchy, typography, and grid-driven compositions.',
        'more': 'A curated selection of additional projects spanning branding and print design.'
    };

    let previouslyFocusedElement = null;

    function openModalForWorkItem(workItem) {
        previouslyFocusedElement = document.activeElement;

        const placeholder = workItem.querySelector('.image-placeholder');
        const projectKey = placeholder ? placeholder.getAttribute('data-project') : '';
        const titleText = workItem.querySelector('.work-info h3')?.textContent?.trim() || 'Project Title';
        const categoryText = workItem.querySelector('.work-info p')?.textContent?.trim() || '';
        const imagePath = projectKeyToImage[projectKey] || '';
        const descriptionText = projectKeyToDescription[projectKey] || 'Detailed case study coming soon. This placeholder describes the goals, approach, and outcomes for the selected project.';

        modalTitle.textContent = titleText;
        modalCategory.textContent = categoryText;
        modalDescription.textContent = descriptionText;

        if (imagePath) {
            modalImage.src = imagePath;
            modalImage.alt = titleText;
            modalImage.style.display = 'block';
        } else {
            modalImage.removeAttribute('src');
            modalImage.alt = '';
            modalImage.style.display = 'none';
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalCloseButton.focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modalImage.removeAttribute('src');
        modalImage.alt = '';
        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
            previouslyFocusedElement.focus();
        }
    }

    workItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            openModalForWorkItem(item);
        });
    });

    modalCloseButton.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});