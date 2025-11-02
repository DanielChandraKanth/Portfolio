// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(13, 13, 13, 0.98)";
  } else {
    navbar.style.background = "rgba(13, 13, 13, 0.95)";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[style*="animation"]').forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax1 = document.querySelector(".diamond-1");
  const parallax2 = document.querySelector(".diamond-2");

  if (parallax1) {
    parallax1.style.transform = `translateY(${scrolled * 0.5}px) rotate(45deg)`;
  }
  if (parallax2) {
    parallax2.style.transform = `translateY(${scrolled * -0.3}px) rotate(45deg)`;
  }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const helloElement = document.querySelector(".hello");
  const nameElement = document.querySelector(".name");

  setTimeout(() => {
    typeWriter(helloElement, "Hello.");
  }, 500);

  setTimeout(() => {
    typeWriter(nameElement, "I'm Daniel", 80);
  }, 1500);
});

// Card hover effects
document.querySelectorAll(".skill-card, .project-card, .cert-item").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Button click effects
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Tech stack animation on scroll
const techTags = document.querySelectorAll(".tech-tag");
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
      }, index * 100);
    }
  });
});
techTags.forEach((tag) => techObserver.observe(tag));

// Profile image rotation on hover
const profileImg = document.querySelector(".profile-circle");
if (profileImg) {
  profileImg.addEventListener("mouseenter", () => {
    profileImg.style.animationDuration = "2s";
  });
  profileImg.addEventListener("mouseleave", () => {
    profileImg.style.animationDuration = "20s";
  });
}

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-card, .project-card, .cert-card, .education-card, .trait-card");
  elements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < window.innerHeight - elementVisible) {
      element.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
      element.classList.add("animated");
    }
  });
};
window.addEventListener("scroll", animateOnScroll);

// Counter animation
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = Number.parseFloat(counter.textContent);
    const increment = target / 100;
    let current = 0;
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        if (target.toString().includes(".")) {
          counter.textContent = current.toFixed(1) + "+";
        } else {
          counter.textContent = Math.ceil(current) + "+";
        }
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    };
    updateCounter();
  });
};
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted");
        animateCounters();
      }
    });
  },
  { threshold: 0.5 }
);
const statsSection = document.querySelector(".hero-stats");
if (statsSection) statsObserver.observe(statsSection);

// Particle background
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.init();
  }
  init() {
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "-1";
    this.canvas.style.opacity = "0.3";
    document.body.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener("resize", () => this.resize());
  }
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 107, 53, ${particle.opacity})`;
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }
}
new ParticleSystem();

// Scroll progress bar
const createScrollProgress = () => {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);
  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + "%";
  });
};
createScrollProgress();

// Project card 3D hover
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) rotateX(5deg)";
    this.style.boxShadow = "0 25px 50px rgba(255, 107, 53, 0.2)";
  });
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateX(0deg)";
    this.style.boxShadow = "var(--shadow-card)";
  });
});

// Floating skill tag animation
const floatSkillTags = () => {
  const skillTags = document.querySelectorAll(".skill-tag, .tech-tag");
  skillTags.forEach((tag, index) => {
    const delay = index * 0.1;
    const duration = 3 + Math.random() * 2;
    tag.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  });
};
window.addEventListener("load", () => {
  setTimeout(floatSkillTags, 1000);
});

// Theme color animation on scroll
const animateThemeColors = () => {
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const hue = 15 + scrollPercent * 30;
  document.documentElement.style.setProperty("--primary-color", `hsl(${hue}, 85%, 60%)`);
  document.documentElement.style.setProperty("--primary-dark", `hsl(${hue}, 85%, 50%)`);
};
window.addEventListener("scroll", animateThemeColors);

// Loading screen
const createLoadingScreen = () => {
  const loader = document.createElement("div");
  loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background-color);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center; color: var(--text-primary);">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid var(--border-color);
                    border-top: 3px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                "></div>
                <p>Loading Portfolio...</p>
            </div>
        </div>
    `;
  document.body.appendChild(loader);
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 500);
    }, 1000);
  });
};
const loaderStyle = document.createElement("style");
loaderStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);
createLoadingScreen();

// === Custom Neon Cursor ===
const cursor = document.createElement("div");
cursor.classList.add("neon-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

document.addEventListener("mousedown", () => {
  cursor.classList.add("click");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("click");
});
