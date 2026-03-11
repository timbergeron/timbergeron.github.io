// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile menu on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
  });
});

// Auto-open collapsed reference sections when navigated by hash
const revealHashTarget = () => {
  if (!window.location.hash) {
    return;
  }

  const target = document.querySelector(window.location.hash);

  if (!target) {
    return;
  }

  const panel = target.matches('.reference-panel')
    ? target
    : target.querySelector('.reference-panel');

  if (panel) {
    panel.open = true;
  }
};

window.addEventListener('hashchange', revealHashTarget);
revealHashTarget();

// Stats console tabs
const statsTabs = document.querySelectorAll('.stats-tab');
const statsPanels = document.querySelectorAll('.stats-panel');

statsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    statsTabs.forEach(t => t.classList.remove('active'));
    statsPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
  });
});

// Command filter tabs
const cmdTabs = document.querySelectorAll('.cmd-tab');
const cmdRows = document.querySelectorAll('.cmd-row');

cmdTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    cmdTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;

    cmdRows.forEach(row => {
      if (filter === 'all' || row.dataset.cat === filter) {
        row.classList.remove('cmd-hidden');
      } else {
        row.classList.add('cmd-hidden');
      }
    });
  });
});

// Scroll-triggered animations
const animTargets = document.querySelectorAll(
  '.mode-card, .feature-card, .integration-card, .admin-card, .comp-block, .cfg-card, .server-card, .play-link'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position within its grid
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 60}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

animTargets.forEach(el => observer.observe(el));
