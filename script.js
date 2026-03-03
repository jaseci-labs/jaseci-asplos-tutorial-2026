document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggling ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const STORAGE_KEY = 'jaseci_tutorial_theme';

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  });

  // --- Mobile Menu ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const sidebar = document.querySelector('.sidebar');

  function toggleMenu() {
    if (window.innerWidth > 768) {
      document.body.classList.toggle('sidebar-hidden');
    } else {
      sidebar.classList.toggle('open');
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', toggleMenu);

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) sidebar.classList.remove('open');
    });
  });

  // --- Active Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      // Sidebar navigation
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      // On this page navigation
      const onThisPageLink = document.querySelector(`.on-this-page a[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + current.offsetHeight) {
        // Update sidebar nav
        if (navLink) {
          document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => a.classList.remove('active'));
          navLink.classList.add('active');
        }
        // Update on this page nav
        if (onThisPageLink) {
          document.querySelectorAll('.on-this-page a').forEach(a => a.classList.remove('active'));
          onThisPageLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  // Run once on load to highlight initial section
  highlightNavigation();
});
