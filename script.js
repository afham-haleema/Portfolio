

const navbar = {
    element: document.getElementById('navbar'),
    init() {
        if (!this.element) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.element.classList.add('scrolled');
            } else {
                this.element.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
};


const mobileMenu = {
    hamburger: document.querySelector('.hamburger'),
    navItems: document.querySelector('.nav-items'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    init() {
        if (!this.hamburger || !this.navItems) return;
        
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMenu();
            }
        });
    },
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navItems.classList.toggle('active');
        document.body.style.overflow = this.navItems.classList.contains('active') ? 'hidden' : '';
    },
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navItems.classList.remove('active');
        document.body.style.overflow = '';
    }
};


const smoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; 
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    history.pushState(null, null, href);
                }
            });
        });
    }
};


const scrollReveal = {
    options: {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    },
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, this.options);
            
            // Observe all sections and cards
            const elements = document.querySelectorAll('.section, .service-card, .experience-card, .project-card, .other-project-card');
            
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
};

const typingEffect = {
    element: document.querySelector('.hero-subtitle'),
    text: '',
    index: 0,
    speed: 100,
    
    init() {
        if (!this.element) return;
        
        this.text = this.element.textContent;
        this.element.textContent = '';
        this.element.style.opacity = '1';
        
        // Wait for hero title animation to complete
        setTimeout(() => {
            this.type();
        }, 600);
    },
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
};

const activeNavigation = {
    sections: null,
    navLinks: null,
    
    init() {
        this.sections = document.querySelectorAll('.section[id]');
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        if (!this.sections.length || !this.navLinks.length) return;
        
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
        });
    },
    
    updateActiveLink() {
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
};

const parallax = {
    init() {
        const gridPattern = document.querySelector('.grid-pattern');
        if (!gridPattern) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            gridPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
};


const tiltEffect = {
    init() {
        const projectImages = document.querySelectorAll('.project-image a');
        
        projectImages.forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
};


const glitchEffect = {
    logo: document.querySelector('.logo'),
    
    init() {
        if (!this.logo) return;
        
        this.logo.addEventListener('mouseenter', () => {
            this.glitch();
        });
    },
    
    glitch() {
        const originalText = this.logo.textContent;
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let iterations = 0;
        
        const interval = setInterval(() => {
            this.logo.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    }
};


const floatingSkills = {
    init() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
        });
    }
};


const emailCopy = {
    init() {
        const emailLinks = document.querySelectorAll('.email-link');
        
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const email = 'afhamhaleema@gmail.com';
                
                navigator.clipboard.writeText(email).then(() => {
                    // Create tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Email copied!';
                    tooltip.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: var(--color-primary);
                        color: var(--color-bg);
                        padding: 1rem 2rem;
                        border-radius: 4px;
                        font-family: var(--font-mono);
                        font-size: 0.875rem;
                        z-index: 10000;
                        animation: fadeIn 0.3s ease;
                    `;
                    
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => {
                            document.body.removeChild(tooltip);
                        }, 300);
                    }, 2000);
                });
            });
        });
    }
};



document.addEventListener('DOMContentLoaded', () => {
    cursor.init();
    navbar.init();
    mobileMenu.init();
    smoothScroll.init();
    scrollReveal.init();
    typingEffect.init(); 
    activeNavigation.init();
    parallax.init();
    tiltEffect.init();
    glitchEffect.init();
    floatingSkills.init();
    emailCopy.init();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});



function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
}, 10));