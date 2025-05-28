var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

/*code to make the resume boxes expand*/
function initCollapsibles() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCollapsibles);
} else {
  initCollapsibles();
}

/* File Cabinet functionality */
function initFileCabinet() {
  // Initialize drawer handles
  const drawerHandles = document.querySelectorAll('.drawer-handle');
  
  drawerHandles.forEach(handle => {
    handle.addEventListener('click', function() {
      const drawer = this.parentElement;
      drawer.classList.toggle('open');
      
      // Close other drawers if you want only one open at a time
      // Uncomment the following to enable this behavior:
      /*
      const otherDrawers = document.querySelectorAll('.file-drawer');
      otherDrawers.forEach(otherDrawer => {
        if (otherDrawer !== drawer) {
          otherDrawer.classList.remove('open');
        }
      });
      */
    });
  });

  // Initialize file tabs
  const fileTabs = document.querySelectorAll('.file-tab');
  
  fileTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      const drawer = this.closest('.file-drawer');
      
      // Remove active class from all tabs in this drawer
      drawer.querySelectorAll('.file-tab').forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all file contents in this drawer
      drawer.querySelectorAll('.file-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Show the selected content
      const selectedContent = drawer.querySelector(`#${tabId}`);
      if (selectedContent) {
        selectedContent.classList.add('active');
      }
    });
  });

  // Auto-open first drawer on page load
  const firstDrawer = document.querySelector('.file-drawer');
  if (firstDrawer) {
    setTimeout(() => {
      firstDrawer.classList.add('open');
    }, 300);
  }
}

// Animate numbers function
function animateNumber(elementId, target) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 30);
}

// Dashboard functionality
function toggleCard(card) {
  const content = card.querySelector('.card-content');
  const toggle = card.querySelector('.collapse-toggle');
  const isExpanded = content.classList.contains('expanded');
  
  if (isExpanded) {
    // Collapse
    content.classList.remove('expanded');
    card.classList.remove('full-width');
    toggle.textContent = '+';
  } else {
    // Expand and make full width
    content.classList.add('expanded');
    card.classList.add('full-width');
    toggle.textContent = '−';
  }
}

function toggleSkill(skillId) {
  const content = document.getElementById(`skill-${skillId}`);
  const toggle = document.querySelector(`[data-skill="${skillId}"] .skill-toggle`);
  
  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    toggle.textContent = '+';
  } else {
    content.classList.add('expanded');
    toggle.textContent = '−';
  }
}

function toggleJob(jobIndex) {
  const jobContent = document.getElementById(`job-${jobIndex}`);
  const jobToggle = document.querySelector(`[data-job="${jobIndex}"]`).querySelector('.job-toggle');
  
  if (jobContent.classList.contains('expanded')) {
    jobContent.classList.remove('expanded');
    jobToggle.textContent = '+';
  } else {
    jobContent.classList.add('expanded');
    jobToggle.textContent = '−';
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    // Expand the section if it's collapsed
    const content = section.querySelector('.card-content');
    const toggle = section.querySelector('.collapse-toggle');
    if (!content.classList.contains('expanded')) {
      content.classList.add('expanded');
      section.classList.add('full-width');
      toggle.textContent = '−';
    }
    
    // Scroll to the section
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialize dashboard functionality
function initDashboard() {
  // Animate summary stats
  const stats = document.querySelector('.summary-stats');
  if (stats) {
    setTimeout(() => {
      animateNumber('years-exp', parseInt(stats.dataset.years) || 0);
      animateNumber('companies-count', parseInt(stats.dataset.companies) || 0);
      animateNumber('roles-count', parseInt(stats.dataset.roles) || 0);
    }, 500);
  }
  
  // Clear any existing event listeners to prevent duplicates
  const existingHandlers = document.querySelectorAll('[data-handler-attached]');
  existingHandlers.forEach(el => el.removeAttribute('data-handler-attached'));
  
  // Card header clickable (entire header area)
  const cardHeaders = document.querySelectorAll('.clickable-header:not([data-handler-attached])');
  cardHeaders.forEach(header => {
    header.setAttribute('data-handler-attached', 'true');
    header.addEventListener('click', function(e) {
      // Don't trigger if clicking on the toggle button itself
      if (e.target.classList.contains('collapse-toggle')) return;
      
      const card = this.closest('.dashboard-card');
      toggleCard(card);
    });
  });
  
  // Toggle button functionality
  const toggleButtons = document.querySelectorAll('.collapse-toggle:not([data-handler-attached])');
  toggleButtons.forEach(btn => {
    btn.setAttribute('data-handler-attached', 'true');
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent header click
      const card = this.closest('.dashboard-card');
      toggleCard(card);
    });
  });
  
  // Job item expansion
  const jobHeaders = document.querySelectorAll('.job-header:not([data-handler-attached])');
  jobHeaders.forEach(header => {
    header.setAttribute('data-handler-attached', 'true');
    header.addEventListener('click', function(e) {
      // Don't trigger if clicking on the toggle button itself
      if (e.target.classList.contains('job-toggle')) return;
      
      const jobIndex = this.getAttribute('data-job');
      toggleJob(jobIndex);
    });
  });
  
  // Job toggle buttons
  const jobToggles = document.querySelectorAll('.job-toggle:not([data-handler-attached])');
  jobToggles.forEach(btn => {
    btn.setAttribute('data-handler-attached', 'true');
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent header click
      const jobIndex = this.closest('.job-header').getAttribute('data-job');
      toggleJob(jobIndex);
    });
  });
  
  // Skill section headers clickable
  const skillHeaders = document.querySelectorAll('.clickable-skill-header:not([data-handler-attached])');
  skillHeaders.forEach(header => {
    header.setAttribute('data-handler-attached', 'true');
    header.addEventListener('click', function(e) {
      // Don't trigger if clicking on the toggle button itself
      if (e.target.classList.contains('skill-toggle')) return;
      
      const skillId = this.getAttribute('data-skill');
      toggleSkill(skillId);
    });
  });
  
  // Skill section toggle buttons
  const skillToggles = document.querySelectorAll('.skill-toggle:not([data-handler-attached])');
  skillToggles.forEach(btn => {
    btn.setAttribute('data-handler-attached', 'true');
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const skillId = this.getAttribute('data-skill');
      toggleSkill(skillId);
    });
  });
  
  // Staggered card animation
  const cards = document.querySelectorAll('.dashboard-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
  });
  
  // Handle URL hash navigation
  if (window.location.hash) {
    const sectionId = window.location.hash.slice(1);
    setTimeout(() => scrollToSection(sectionId), 600);
  }
  
  // Add event listeners for dropdown navigation links
  const resumeDropdownLinks = document.querySelectorAll('.dropdown-link[href*="#"]:not([data-handler-attached])');
  resumeDropdownLinks.forEach(link => {
    link.setAttribute('data-handler-attached', 'true');
    link.addEventListener('click', function(e) {
      if (window.location.pathname === '/resume') {
        e.preventDefault();
        const sectionId = this.getAttribute('href').split('#')[1];
        scrollToSection(sectionId);
      } else {
        // If navigating to resume page, ensure dashboard initializes
        setTimeout(() => {
          if (document.querySelector('#resume-dashboard')) {
            initDashboard();
          }
        }, 500);
      }
    });
  });
}

// Expose functions globally for navigation
window.scrollToSection = scrollToSection;
window.toggleCard = toggleCard;
window.toggleJob = toggleJob;
window.toggleSkill = toggleSkill;
window.initDashboard = initDashboard;

// Initialize file cabinet on page load or when content changes
function initializeResumeFeatures() {
  // Add a small delay to ensure DOM is fully loaded
  setTimeout(() => {
    if (document.querySelector('#resume-dashboard')) {
      console.log('Initializing dashboard features');
      initDashboard();
    } else if (document.querySelector('.file-cabinet')) {
      initFileCabinet();
    } else if (document.querySelector('.collapsible')) {
      initCollapsibles();
    }
  }, 50);
}

// Update initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeResumeFeatures);
} else {
  initializeResumeFeatures();
}

// Reinitialize when content changes (for SPA navigation)
window.addEventListener('themechange', () => {
  setTimeout(initializeResumeFeatures, 100);
});

// Watch for resume dashboard being added to DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.id === 'resume-dashboard' || node.querySelector('#resume-dashboard')) {
          console.log('Resume dashboard detected in DOM, initializing...');
          setTimeout(() => initDashboard(), 100);
        }
      }
    });
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});