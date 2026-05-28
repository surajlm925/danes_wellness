// Add subtle parallax effect to the hero background
document.addEventListener('DOMContentLoaded', () => {
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // Move the background slightly slower than the scroll speed
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navCenter.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navCenter.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.nav-center a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navCenter.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Reveal on Scroll / Onload Animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset the trigger point
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Vector Mask Reveal Logic (Observe parent sections because clip-path hides the element from the observer)
    const vectorSectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const vectors = entry.target.querySelectorAll('.vector-reveal');
                vectors.forEach(v => v.classList.add('active'));
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe the sections that contain vectors
    const sectionsWithVectors = document.querySelectorAll('.shop-by-concern, .mapping-section, .chosen-section');
    sectionsWithVectors.forEach(section => {
        vectorSectionObserver.observe(section);
    });
});

// Preloader Removal Logic
const preloader = document.getElementById('preloader');
if (preloader) {
    const hidePreloader = () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = '';
            document.body.classList.add('preloader-done');
        }, 1200);
    };

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
}
