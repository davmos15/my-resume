const TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    const that = this;
    let delta = 200 - Math.random() * 100;

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
    const elements = document.getElementsByClassName('typewrite');
    for (let i=0; i<elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

/*code to make the resume boxes expand*/
function initCollapsibles() {
  const coll = document.getElementsByClassName("collapsible");
  let i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
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

// Dashboard functionality - toggleCard is now handled inline in resume.astro
// This ensures no timing issues with modal initialization

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
    const cardId = section.getAttribute('data-card');
    if (window.openResumeModal) {
      window.openResumeModal(cardId);
    } else {
      console.warn('openResumeModal not available yet');
      // Try to initialize and retry
      if (typeof initResumeModal === 'function') {
        initResumeModal();
        setTimeout(() => {
          if (window.openResumeModal) {
            window.openResumeModal(cardId);
          }
        }, 100);
      }
    }
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
  
  // Make entire card clickable (like project cards)
  // Dashboard card click handling is now done in page-specific scripts
  // to avoid timing issues with modal functionality
  
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
// toggleCard is now handled in page-specific scripts
window.toggleJob = toggleJob;
window.toggleSkill = toggleSkill;
window.initDashboard = initDashboard;

// Initialize file cabinet on page load or when content changes
function initializeResumeFeatures() {
  // Add a small delay to ensure DOM is fully loaded
  setTimeout(() => {
    if (document.querySelector('#resume-dashboard')) {
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
  document.addEventListener('DOMContentLoaded', () => {
    initializeResumeFeatures();
    initializePageFeatures();
  });
} else {
  initializeResumeFeatures();
  initializePageFeatures();
}

// Projects page initialization
function initProjectsPage() {
  const container = document.getElementById('projects-react-root');
  if (!container) return;
  
  // Check if React libraries are loaded
  if (!window.React || !window.ReactDOM) {
    console.log('React libraries not loaded yet, retrying...');
    setTimeout(initProjectsPage, 200);
    return;
  }
  
  // Check if projects data is available
  if (!window.projectsData) {
    console.warn('Projects data not available');
    return;
  }
  
  // Force re-initialization if container is empty
  if (container.children.length === 0) {
    container.removeAttribute('data-react-initialized');
  }
  
  // Check if already initialized
  if (container.hasAttribute('data-react-initialized')) {
    return;
  }
  
  container.setAttribute('data-react-initialized', 'true');
  
  // Use the global React components
  if (window.ProjectsApp) {
    try {
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(window.ProjectsApp));
      console.log('Projects app initialized successfully');
    } catch (error) {
      console.error('Error initializing projects app:', error);
      container.removeAttribute('data-react-initialized');
    }
  } else {
    // If ProjectsApp not available yet, try again
    console.log('ProjectsApp not available yet, retrying...');
    setTimeout(initProjectsPage, 200);
  }
}

// Initialize card handlers for resume and projects pages
function initCardHandlers() {
  console.log('🔧 Initializing card handlers...');
  
  // Resume page cards
  const resumeCards = document.querySelectorAll('[data-card-type="resume"]');
  if (resumeCards.length > 0) {
    console.log('📄 Resume: Found', resumeCards.length, 'resume cards');
    
    // Resume data from page context
    const resumeData = window.resumeData || {};
    
    resumeCards.forEach((card, index) => {
      const section = card.getAttribute('data-section');
      console.log('📄 Resume: Setting up card', index + 1, 'section:', section);
      
      card.addEventListener('click', () => {
        console.log('🖱️ Resume: Card clicked!', section);
        
        if (resumeData[section] && window.safeOpenModal) {
          console.log('🔧 Resume: Opening modal for section:', section);
          window.safeOpenModal(resumeData[section]);
        } else {
          console.error('❌ Resume: No data found for section:', section);
        }
      });
    });
    
    console.log('✅ Resume: Card setup complete!');
  }
  
  // Projects page cards
  const projectCards = document.querySelectorAll('[data-card-type="project"]');
  if (projectCards.length > 0) {
    console.log('🚀 Projects: Found', projectCards.length, 'project cards');
    
    // Projects data from page context
    const projectsData = window.projectsData || [];
    
    projectCards.forEach((card, index) => {
      const projectId = parseInt(card.getAttribute('data-project-id'));
      console.log('🚀 Projects: Setting up card', index + 1, 'ID:', projectId);
      
      card.addEventListener('click', () => {
        console.log('🖱️ Projects: Card clicked!', projectId);
        
        const project = projectsData.find(p => p.id === projectId);
        
        if (project && window.safeOpenModal) {
          console.log('🔧 Projects: Opening modal for project:', project.title);
          window.safeOpenModal({
            icon: project.emoji || '🚀',
            title: project.title,
            subtitle: project.subtitle,
            content: buildProjectContent(project)
          });
        } else {
          console.error('❌ Projects: No project found for ID:', projectId);
        }
      });
    });
    
    console.log('✅ Projects: Card setup complete!');
  }
}

// Helper function to build project content
function buildProjectContent(project) {
  return `
    <div class="modal-section">
      <h3>Overview</h3>
      <p>${project.description}</p>
    </div>
    
    ${project.details ? `
      <div class="modal-section">
        <h3>Details</h3>
        <div class="project-details">
          ${project.details}
        </div>
      </div>
    ` : ''}
    
    ${project.tech_stack ? `
      <div class="modal-section">
        <h3>Tech Stack</h3>
        <div class="tech-stack">
          ${project.tech_stack.split(',').map(tech => 
            `<span class="tech-tag">${tech.trim()}</span>`
          ).join('')}
        </div>
      </div>
    ` : ''}
    
    ${project.github_url || project.live_url ? `
      <div class="modal-section">
        <h3>Links</h3>
        <div class="project-links">
          ${project.github_url ? `
            <a href="${project.github_url}" target="_blank" rel="noopener noreferrer" class="project-link">
              <span>📂</span> View Code
            </a>
          ` : ''}
          ${project.live_url ? `
            <a href="${project.live_url}" target="_blank" rel="noopener noreferrer" class="project-link">
              <span>🔗</span> Live Demo
            </a>
          ` : ''}
        </div>
      </div>
    ` : ''}
  `;
}

// Initialize appropriate features based on current page
function initializePageFeatures() {
  setTimeout(() => {
    // Always initialize modal manager first
    initModalManager();
    
    // Wait a bit for modal manager to be ready, then init card handlers
    setTimeout(() => {
      initCardHandlers();
    }, 200);
    
    if (document.querySelector('#resume-dashboard')) {
      initDashboard();
    } else if (document.querySelector('.file-cabinet')) {
      initFileCabinet();
    } else if (document.querySelector('.collapsible')) {
      initCollapsibles();
    } else if (document.querySelector('#projects-react-root')) {
      initProjectsPage();
    }
  }, 50);
}

// Reinitialize when content changes (for SPA navigation)
window.addEventListener('themechange', () => {
  setTimeout(initializePageFeatures, 100);
});

// Watch for dynamic content being added to DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.id === 'resume-dashboard' || node.querySelector('#resume-dashboard')) {
          setTimeout(() => initDashboard(), 100);
        } else if (node.id === 'projects-react-root' || node.querySelector('#projects-react-root')) {
          setTimeout(() => initProjectsPage(), 100);
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

// Re-initialize on browser navigation
window.addEventListener('pageshow', function(event) {
  if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
    initializePageFeatures();
  }
});

// Re-initialize on popstate (browser back/forward)
window.addEventListener('popstate', initializePageFeatures);

// Modal Manager - Initialize on every page load
function initModalManager(retryCount = 0) {
  console.log('🚀 ModalManager: Starting initialization...', retryCount > 0 ? `(retry ${retryCount})` : '');
  
  // Check if modal element exists, if not, retry with delay
  if (!document.getElementById('unified-modal')) {
    if (retryCount < 20) { // Max 2 seconds of retries
      console.log('⏳ ModalManager: Modal element not ready, retrying in 100ms...');
      setTimeout(() => initModalManager(retryCount + 1), 100);
      return;
    } else {
      console.warn('⚠️ ModalManager: Modal element not found after retries, skipping initialization');
      return;
    }
  }
  
  // Simple Modal Manager - no events, just direct access
  window.modalManager = {
    modal: null,
    modalContent: null,
    modalClose: null,
    modalIcon: null,
    modalTitle: null,
    modalSubtitle: null,
    modalBody: null,
    isOpen: false,
    eventListenersAttached: false,
    escapeListener: null,
    
    init() {
      console.log('🔧 ModalManager: Starting initialization...');
      
      // Always get fresh DOM references
      this.modal = document.getElementById('unified-modal');
      console.log('🔧 ModalManager: Modal element found:', !!this.modal);
      
      if (!this.modal) {
        console.error('❌ ModalManager: unified-modal element not found in DOM');
        return false;
      }
      
      // Clear any existing state
      this.isOpen = false;
      this.removeEventListeners();
      
      // Get fresh references to all modal elements
      this.modalContent = this.modal.querySelector('.modal-content');
      this.modalClose = this.modal.querySelector('.modal-close');
      this.modalIcon = this.modal.querySelector('.modal-icon');
      this.modalTitle = this.modal.querySelector('.modal-title');
      this.modalSubtitle = this.modal.querySelector('.modal-subtitle');
      this.modalBody = this.modal.querySelector('.modal-body');
      
      console.log('🔧 ModalManager: Sub-elements found:', {
        content: !!this.modalContent,
        close: !!this.modalClose,
        icon: !!this.modalIcon,
        title: !!this.modalTitle,
        subtitle: !!this.modalSubtitle,
        body: !!this.modalBody
      });
      
      this.setupEventListeners();
      console.log('✅ ModalManager: Initialization complete');
      return true;
    },
    
    removeEventListeners() {
      // Remove the old escape key listener if it exists
      if (this.escapeListener) {
        document.removeEventListener('keydown', this.escapeListener);
        this.escapeListener = null;
      }
      this.eventListenersAttached = false;
    },
    
    setupEventListeners() {
      if (!this.modal || this.eventListenersAttached) return;
      
      // Close button
      if (this.modalClose) {
        this.modalClose.addEventListener('click', () => this.close());
      }
      
      // Click outside to close
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
      
      // Create escape key listener function
      this.escapeListener = (e) => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      };
      
      // Add escape key listener
      document.addEventListener('keydown', this.escapeListener);
      
      this.eventListenersAttached = true;
    },
    
    open(data) {
      console.log('🔧 ModalManager: Opening modal with data:', data);
      
      if (!this.modal) {
        console.error('❌ ModalManager: Cannot open - modal element not found');
        return;
      }
      
      if (this.isOpen) {
        console.warn('⚠️ ModalManager: Modal already open, ignoring request');
        return;
      }
      
      // Update modal content
      if (this.modalIcon) this.modalIcon.textContent = data.icon || '';
      if (this.modalTitle) this.modalTitle.textContent = data.title || '';
      if (this.modalSubtitle) {
        this.modalSubtitle.textContent = data.subtitle || '';
        this.modalSubtitle.style.display = data.subtitle ? 'block' : 'none';
      }
      if (this.modalBody) this.modalBody.innerHTML = data.content || '';
      
      console.log('🔧 ModalManager: Content updated, showing modal...');
      
      // Show modal
      this.isOpen = true;
      this.modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      console.log('✅ ModalManager: Modal opened successfully');
      
      // Initialize any interactive content
      this.initModalInteractions();
    },
    
    close() {
      if (!this.modal || !this.isOpen) return;
      
      this.isOpen = false;
      this.modal.classList.remove('show');
      document.body.style.overflow = '';
    },
    
    initModalInteractions() {
      // Handle collapsible sections in modal
      const toggles = this.modalBody?.querySelectorAll('[data-toggle]');
      toggles?.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          const targetId = toggle.getAttribute('data-toggle');
          const target = this.modalBody?.querySelector(`#${targetId}`);
          if (target) {
            target.classList.toggle('expanded');
            toggle.textContent = target.classList.contains('expanded') ? '−' : '+';
          }
        });
      });
    }
  };

  // Force re-initialization to ensure fresh DOM references
  if (window.modalManager) {
    // Clear any existing state first
    window.modalManager.isOpen = false;
    window.modalManager.removeEventListeners();
  }

  const initResult = window.modalManager.init();
  console.log('🚀 ModalManager: Init result:', initResult);

  // Utility function to ensure modal manager is properly initialized
  window.ensureModalManager = function() {
    if (!window.modalManager) {
      console.log('❌ Modal manager object does not exist');
      return false;
    }
    
    // Check if modal element still exists in DOM
    const currentModal = document.getElementById('unified-modal');
    if (!currentModal) {
      console.log('❌ Modal element not found in DOM');
      return false;
    }
    
    // If modal manager exists but doesn't have a reference to current modal, re-init
    if (!window.modalManager.modal || window.modalManager.modal !== currentModal) {
      console.log('🔄 Modal reference stale, re-initializing...');
      return window.modalManager.init();
    }
    
    return true;
  };

  // Global function for pages to safely open modals
  window.safeOpenModal = function(data) {
    console.log('🔧 Safe modal open requested:', data);
    
    if (!window.ensureModalManager()) {
      console.error('❌ Failed to ensure modal manager is ready');
      return false;
    }
    
    if (window.modalManager && window.modalManager.open) {
      window.modalManager.open(data);
      return true;
    }
    
    console.error('❌ Modal manager open function not available');
    return false;
  };
}

// Special handler for projects page to ensure React loads
window.addEventListener('load', function() {
  // Initialize modal manager on every page load
  initModalManager();
  
  // Extra initialization for projects page after full page load
  if (document.querySelector('#projects-react-root')) {
    setTimeout(function() {
      const container = document.getElementById('projects-react-root');
      if (container && container.children.length === 0) {
        console.log('Projects container empty after load, attempting initialization...');
        initProjectsPage();
      }
    }, 500);
  }
  
  // Ensure resume modal is available
  if (document.querySelector('#resume-dashboard') && !window.openResumeModal) {
    console.log('Resume modal not initialized, attempting initialization...');
    if (typeof initResumeModal === 'function') {
      initResumeModal();
    }
  }
});