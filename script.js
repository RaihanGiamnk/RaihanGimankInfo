document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#8a2be2", "#00f5d4", "#ff206e"] },
            shape: { type: ["circle", "triangle"] },
            opacity: {
                value: 0.7,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1 }
            },
            size: {
                value: 4,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1 }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    // Animated counters
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Trigger counters when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue('subscriberCount', 0, 12500, 2000);
                animateValue('videoCount', 0, 86, 1500);
                animateValue('viewCount', 0, 3250000, 2500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.hero'));

    // Navigation active state
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Create floating particles
    function createParticles() {
        const container = document.querySelector('.bg-elements');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100 + 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
        }
    }

    createParticles();

    // 3D tilt effect
    document.querySelector('.hero-avatar').addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        e.currentTarget.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.querySelector('.hero-avatar').addEventListener('mouseleave', (e) => {
        e.currentTarget.style.transform = 'rotateY(0) rotateX(0)';
    });
});

// Fungsi untuk mengambil data video TikTok
async function fetchTikTokVideoStats(7470892070245256449) {
    const API_KEY = 'YOUR_TIKTOK_API_KEY'; // Ganti dengan API Key Anda
    const response = await fetch(`https://api.tiktok.com/v1/videos/${videoId}/stats?access_token=${API_KEY}`);
    const data = await response.json();
    return data;
}

// Contoh penggunaan (ganti VIDEO_ID dengan ID video TikTok Anda)
const VIDEO_ID = 'raihangimank12'; // Contoh ID video
fetchTikTokVideoStats(VIDEO_ID)
    .then(data => {
        document.querySelector('.work-meta span:first-child').innerHTML = 
            `<i class="fas fa-eye"></i> ${data.viewCount} views`;
    })
    .catch(error => console.error('Error:', error));