// ── Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── Close menu on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  const burger = document.querySelector('.hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ── Stat counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => statObserver.observe(el));

// ── Contact form → WhatsApp
function handleSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const service = document.getElementById('fservice').value;
  const message = document.getElementById('fmessage').value.trim();

  const waText = encodeURIComponent(
    `Hello GM Technologiez!\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`
  );

  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  document.getElementById('contactForm').reset();

  setTimeout(() => {
    window.open(`https://wa.me/256740797259?text=${waText}`, '_blank');
  }, 900);
}

// ── Nav scroll styling
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.borderBottomColor =
    window.scrollY > 40 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)';
});
