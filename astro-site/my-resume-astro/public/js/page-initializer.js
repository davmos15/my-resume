// Page Initializer - Ensures proper script loading order
// This script coordinates initialization of different page components

window.PageInitializer = {
  // Track what needs to be initialized
  pendingInits: new Set(),
  initialized: new Set(),
  
  // Register a component that needs initialization
  register(componentName, initFunction) {
    if (this.initialized.has(componentName)) {
      console.warn(`Component ${componentName} already initialized`);
      return;
    }
    
    this.pendingInits.add({
      name: componentName,
      init: initFunction
    });
  },
  
  // Initialize a specific component
  initComponent(componentName) {
    const component = Array.from(this.pendingInits).find(c => c.name === componentName);
    if (!component) {
      console.warn(`Component ${componentName} not found`);
      return false;
    }
    
    try {
      component.init();
      this.initialized.add(componentName);
      this.pendingInits.delete(component);
      console.log(`Initialized: ${componentName}`);
      return true;
    } catch (error) {
      console.error(`Failed to initialize ${componentName}:`, error);
      return false;
    }
  },
  
  // Initialize all pending components
  initAll() {
    const components = Array.from(this.pendingInits);
    components.forEach(component => {
      this.initComponent(component.name);
    });
  },
  
  // Wait for a component to be available
  waitForComponent(componentName, callback, maxAttempts = 50) {
    let attempts = 0;
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (this.initialized.has(componentName)) {
        clearInterval(checkInterval);
        callback();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error(`Timeout waiting for component: ${componentName}`);
      }
    }, 100);
  }
};

// Resume page specific initialization
window.initializeResumePage = function() {
  // Check if we're on the resume page
  if (!document.querySelector('#resume-dashboard')) {
    return;
  }
  
  console.log('Initializing resume page...');
  
  // Register the resume modal initialization
  PageInitializer.register('resumeModal', () => {
    if (typeof initResumeModal === 'function') {
      initResumeModal();
      
      // Make sure toggleCard knows the modal is ready
      window._resumeModalReady = true;
      
      // Trigger any pending card opens
      if (window._pendingCardOpen) {
        window.openResumeModal(window._pendingCardOpen);
        window._pendingCardOpen = null;
      }
    }
  });
  
  // Register dashboard initialization
  PageInitializer.register('dashboard', () => {
    if (typeof initDashboard === 'function') {
      initDashboard();
    }
  });
  
  // Initialize all components
  PageInitializer.initAll();
};

// Updated toggleCard function that handles async loading better
window.toggleCard = function(card) {
  const cardId = card.getAttribute('data-card');
  
  // If modal is ready, open it
  if (window.openResumeModal && window._resumeModalReady) {
    window.openResumeModal(cardId);
    return;
  }
  
  // Store the pending card open
  window._pendingCardOpen = cardId;
  
  // If we're still waiting for initialization
  if (!window._resumeModalReady) {
    console.log('Waiting for resume modal to be ready...');
    
    // Try to initialize if not done yet
    if (typeof initializeResumePage === 'function') {
      initializeResumePage();
    }
    
    // Wait for the modal to be ready
    PageInitializer.waitForComponent('resumeModal', () => {
      if (window.openResumeModal) {
        window.openResumeModal(cardId);
        window._pendingCardOpen = null;
      }
    });
  }
};