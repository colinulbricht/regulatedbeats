// app.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar-container');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'hsl(120 10% 4% / 0.95)';
    } else {
      navbar.style.background = 'hsl(120 10% 4% / 0.9)';
    }
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature cards for staggered animation
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});


//graffiti 

document.addEventListener('DOMContentLoaded', () => {
  const graffitis = document.querySelectorAll('.graffiti');
  const positions = [];

  function randomColor() {
    const hues = [110, 120, 130, 140, 150];
    const hue = hues[Math.floor(Math.random() * hues.length)];
    return `hsl(${hue}, 90%, 55%)`;
  }

  function getRandomPosition(width, height) {
    const padding = 50; // optional padding from edges
    const maxAttempts = 50;

    for (let i = 0; i < maxAttempts; i++) {
      const x = Math.random() * (window.innerWidth - width - padding * 2) + padding;
      const y = Math.random() * (window.innerHeight - height - padding * 2) + padding;

      // check for overlap
      const overlapping = positions.some(pos => {
        return !(x + width < pos.x || x > pos.x + pos.width || y + height < pos.y || y > pos.y + pos.height);
      });

      if (!overlapping) {
        positions.push({ x, y, width, height });
        return { x, y };
      }
    }
    // fallback if too many attempts
    return { x: 0, y: 0 };
  }

  graffitis.forEach(graffiti => {
    const rect = { width: graffiti.offsetWidth, height: graffiti.offsetHeight };
    const pos = getRandomPosition(rect.width, rect.height);
    graffiti.style.left = `${pos.x}px`;
    graffiti.style.top = `${pos.y}px`;

    // set initial color
    graffiti.style.color = randomColor();

    // change color after each fade cycle
    graffiti.addEventListener('animationiteration', () => {
      graffiti.style.color = randomColor();
    });
  });
});
