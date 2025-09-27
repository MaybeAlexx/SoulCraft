// This file contains JavaScript code that enhances the interactivity of the website.
// It includes GSAP animations and other dynamic features to create a visually stunning experience.

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- SMOOTH LOADING ANIMATIONS ---

    // 1. Hero Section Animation (Homepage Only)
    if (document.querySelector('.hero-title')) {
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroTimeline
            .from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.2 })
            .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
            .from('.hero-button', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5');
    }

    // 2. Animate sections as they scroll into view
    const sectionsToAnimate = [
        '#about-us',
        '#features',
        '#join-info',
        '#join',
        '#regulations',
        '#the-team'
    ];

    sectionsToAnimate.forEach(section => {
        if (document.querySelector(section)) {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });

    // 3. Feature Cards Animation (Homepage Only)
    if (document.querySelector('#features')) {
        gsap.from('.feature-card', {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '#features',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });
    }

    // 4. Team Cards Animation (Info Page Only)
    if (document.querySelector('#the-team')) {
        gsap.from('.team-card', {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '#the-team',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });
    }


    // --- INTERACTIVE ANIMATIONS & FUNCTIONALITY ---

    // Define common elements used by multiple functions
    const pageContent = document.getElementById('page-content');

    // Hover Animations for Buttons and Cards
    const interactiveElements = gsap.utils.toArray([
        '.hero-button', 
        '.feature-card', 
        '#copy-ip-btn', 
        '.cta-button',
        '.about-button',
        '.team-card'
    ]);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Smooth scroll for the hero button
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Copy IP functionality (Homepage Only)
    const copyBtn = document.getElementById('copy-ip-btn');
    const serverIpEl = document.getElementById('server-ip');

    if (copyBtn && serverIpEl) {
        const serverIp = serverIpEl.textContent;
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(serverIp).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy IP: ', err);
            });
        });
    }

    // Full Screen Menu Toggle (Works on both pages)
    const menuBtn = document.getElementById('menu-btn');
    const fullScreenMenu = document.getElementById('full-screen-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const body = document.body;
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    gsap.set('.menu-link', { opacity: 0, y: 20 });
    const menuTimeline = gsap.timeline({ paused: true, reversed: true });

    menuTimeline
        .to(fullScreenMenu, { autoAlpha: 1, duration: 0.4, ease: 'power2.inOut' })
        .to('.menu-link', {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.3,
            ease: 'power2.out'
        }, "-=0.2");

    const toggleMenu = () => {
        body.classList.toggle('overflow-hidden');
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        
        menuTimeline.reversed() ? menuTimeline.play() : menuTimeline.reverse();
    };

    if (menuBtn && fullScreenMenu) {
        menuBtn.addEventListener('click', toggleMenu);

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!menuTimeline.reversed()) {
                    toggleMenu();
                }
            });
        });
    }

    // --- HISTORY POPUP (Homepage Only) ---
    const historyBtn = document.getElementById('history-btn');
    const historyPopup = document.getElementById('history-popup');
    const closeHistoryBtn = document.getElementById('close-history-popup-btn');
    const historyOverlay = document.getElementById('history-popup-overlay');

    if (historyBtn && historyPopup && closeHistoryBtn && pageContent && historyOverlay) {
        const showHistoryPopup = (e) => {
            e.preventDefault();
            pageContent.classList.add('blurred');
            gsap.to(historyPopup, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
        };

        const hideHistoryPopup = () => {
            pageContent.classList.remove('blurred');
            gsap.to(historyPopup, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
        };

        historyBtn.addEventListener('click', showHistoryPopup);
        closeHistoryBtn.addEventListener('click', hideHistoryPopup);
        historyOverlay.addEventListener('click', hideHistoryPopup); // Close when clicking overlay
    }

    // --- DEVELOPER POPUP ---
    const popup = document.getElementById('developer-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    
    if (popup && closePopupBtn && pageContent) {
        const showPopup = () => {
            if (sessionStorage.getItem('popupClosed')) {
                return; // Don't show if it was closed this session
            }
            pageContent.classList.add('blurred');
            gsap.to(popup, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
        };

        const hidePopup = () => {
            pageContent.classList.remove('blurred');
            gsap.to(popup, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
            sessionStorage.setItem('popupClosed', 'true'); // Remember it was closed
        };

        setTimeout(showPopup, 5000); // Show popup after 5 seconds
        closePopupBtn.addEventListener('click', hidePopup);
    }
});

// --- PAGE LOAD SCROLL HANDLER ---
// This handles scrolling to a section when navigating from another page.
// It waits for the entire window (including images) to load first.
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});