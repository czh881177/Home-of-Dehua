// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// ===== Navigation Functions =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== Smooth Scrolling =====
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== Back to Top Button =====
function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// ===== Skills Animation =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .highlight-item, .project-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Contact Form Handling =====
function handleContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('消息发送成功！感谢您的联系。', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: 10px;
        padding: 5px;
    `;
    
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== Typing Effect =====
function initTypingEffect() {
    const typingText = document.querySelector('.hero-subtitle');
    if (typingText) {
        const originalText = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '2px solid rgba(255, 255, 255, 0.8)';
        
        let index = 0;
        function typeWriter() {
            if (index < originalText.length) {
                typingText.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeWriter, 1000);
    }
}

// ===== Parallax Effect =====
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== Active Navigation Highlighting =====
function highlightActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Easter Egg: Konami Code =====
function initEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.length === konamiCode.length && 
            userInput.every((code, index) => code === konamiCode[index])) {
            
            // Trigger easter egg
            document.body.style.filter = 'hue-rotate(180deg)';
            showNotification('🎉 你发现了隐藏彩蛋！欢迎来到德化的世界！', 'success');
            
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            
            userInput = [];
        }
    });
}

// ===== Performance Optimizations =====
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let ticking = false;
    
    function updateOnScroll() {
        handleNavbarScroll();
        toggleBackToTopButton();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== Theme Toggle (Dark Mode) =====
function initThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        transition: transform 0.3s ease;
        transform: translateY(-50%);
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    document.body.appendChild(themeToggle);
}

// ===== Initialize All Functions =====
function init() {
    // Event Listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });
    
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            smoothScroll('#home');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Initialize features
    animateSkills();
    initScrollAnimations();
    handleContactForm();
    highlightActiveNavigation();
    initTypingEffect();
    initParallaxEffect();
    initEasterEgg();
    optimizePerformance();
    initThemeToggle();
    
    // Scroll event listeners
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', toggleBackToTopButton);
    
    console.log('🎉 德化个人主页已成功加载！');
}

// ===== DOM Content Loaded =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== Service Worker Registration (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}