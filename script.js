// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const phrases = [
    'Twoja przyszłość w IT zaczyna się tutaj',
    'Kod to nowa supermoc',
    'Programuj swoją przyszłość',
    'Od pasji do profesji',
    'Buduj aplikacje zmieniające świat'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before starting new phrase
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
setTimeout(typeWriter, 1000);

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pl-PL');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pl-PL');
        }
    }, 16);
}

// Observer for counting animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(stat => {
    statsObserver.observe(stat);
});

// Matrix Background Animation
const matrixBg = document.getElementById('matrixBg');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

matrixBg.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 8, 22, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

// Slower matrix animation
setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Smooth Scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 65, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in effect to cards
document.querySelectorAll('.school-card, .skill-category, .exam-card, .reality-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    fadeInObserver.observe(card);
});

// Glitch effect on hover for hero title
const glitchElements = document.querySelectorAll('.hero-glitch');
glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'glitch 0.3s infinite';
        }, 10);
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'glitch 3s infinite';
    });
});

// Card hover sound effect (optional - visual feedback only)
document.querySelectorAll('.school-card, .exam-card, .skill-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Terminal typing effect
const terminalBody = document.querySelector('.terminal-body');
if (terminalBody) {
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lines = terminalBody.querySelectorAll('p');
                lines.forEach((line, index) => {
                    line.style.opacity = '0';
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transition = 'opacity 0.3s ease';
                    }, index * 200);
                });
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    terminalObserver.observe(terminalBody);
}

// Dynamic button glow effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--mouse-x', `${x}px`);
        btn.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.section-header').forEach(header => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        header.style.transform = `translateY(${yPos}px)`;
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎮 Gratulacje! Znalazłeś easter egg! 🎉\n\nPrawdziwy programista zawsze szuka ukrytych funkcji w kodzie.');
        }, 100);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add random glitch effect to random elements occasionally
setInterval(() => {
    const glitchable = document.querySelectorAll('.section-title, .category-title, .exam-badge');
    const randomElement = glitchable[Math.floor(Math.random() * glitchable.length)];
    
    if (randomElement && Math.random() > 0.7) {
        const originalText = randomElement.textContent;
        randomElement.style.animation = 'glitch 0.2s';
        
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 200);
    }
}, 5000);

// Skill items progressive reveal
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 50);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.5s ease';
    skillObserver.observe(item);
});

// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    const isOdd = Array.from(timelineItems).indexOf(item) % 2 === 0;
    item.style.transform = isOdd ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.8s ease';
    timelineObserver.observe(item);
});

// Add copyright year dynamically
const currentYear = new Date().getFullYear();
document.querySelectorAll('.footer-right p').forEach(p => {
    if (p.textContent.includes('2026')) {
        p.textContent = p.textContent.replace('2026', currentYear);
    }
});

// Console easter egg
console.log('%c🚀 TECHNIK PROGRAMISTA', 'color: #00ff41; font-size: 24px; font-weight: bold;');
console.log('%cWitaj w konsoli programisty! 💻', 'color: #ff006e; font-size: 16px;');
console.log('%cJeśli to czytasz, to jesteś na dobrej drodze do zostania programistą!', 'color: #8338ec; font-size: 14px;');
console.log('%c\nZespół Szkół Nr 1 im. Ignacego Łukasiewicza w Gorlicach', 'color: #00ff41; font-size: 12px;');
console.log('%chttps://www.lukasiewicz.gorlice.pl/', 'color: #a0a0a0; font-size: 12px;');

// Performance optimization - lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c\n👾 Easter Egg: Spróbuj wpisać kod Konami!', 'color: #00ff41; font-size: 10px; font-style: italic;');