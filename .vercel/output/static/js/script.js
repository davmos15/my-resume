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

// Initialize appropriate features based on current page
function initializePageFeatures() {
  setTimeout(() => {
    if (document.querySelector('.file-cabinet')) {
      initFileCabinet();
    } else if (document.querySelector('.collapsible')) {
      initCollapsibles();
    }
  }, 50);
}

// Update initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializePageFeatures();
  });
} else {
  initializePageFeatures();
}

// Reinitialize when content changes (for SPA navigation)
window.addEventListener('themechange', () => {
  setTimeout(initializePageFeatures, 100);
});

// Re-initialize on browser navigation
window.addEventListener('pageshow', function(event) {
  if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
    initializePageFeatures();
  }
});

// Re-initialize on popstate (browser back/forward)
window.addEventListener('popstate', initializePageFeatures);