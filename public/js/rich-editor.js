// Rich Text Editor functionality for admin forms
class RichTextEditor {
  constructor(textarea) {
    this.textarea = textarea;
    this.init();
  }

  init() {
    this.createToolbar();
    this.attachEventListeners();
  }

  createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'rich-toolbar';
    
    const buttons = [
      { id: 'bold', label: 'B', title: 'Bold', style: 'font-weight: bold;' },
      { id: 'italic', label: 'I', title: 'Italic', style: 'font-style: italic;' },
      { id: 'underline', label: 'U', title: 'Underline', style: 'text-decoration: underline;' },
      { id: 'separator1', label: '|', disabled: true },
      { id: 'ul', label: '• List', title: 'Bullet List' },
      { id: 'ol', label: '1. List', title: 'Numbered List' },
      { id: 'separator2', label: '|', disabled: true },
      { id: 'link', label: 'Link', title: 'Insert Link' }
    ];

    buttons.forEach(btn => {
      if (btn.id.startsWith('separator')) {
        const separator = document.createElement('span');
        separator.textContent = btn.label;
        separator.style.margin = '0 4px';
        separator.style.color = '#ccc';
        toolbar.appendChild(separator);
      } else {
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = btn.label;
        button.title = btn.title;
        button.dataset.action = btn.id;
        if (btn.style) button.style.cssText = btn.style;
        if (btn.disabled) button.disabled = true;
        toolbar.appendChild(button);
      }
    });

    // Create container and insert toolbar
    const container = document.createElement('div');
    container.className = 'rich-text-container';
    this.textarea.parentNode.insertBefore(container, this.textarea);
    container.appendChild(toolbar);
    container.appendChild(this.textarea);
  }

  attachEventListeners() {
    const toolbar = this.textarea.parentNode.querySelector('.rich-toolbar');
    toolbar.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
        e.preventDefault();
        this.handleAction(e.target.dataset.action);
      }
    });
  }

  handleAction(action) {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const selectedText = this.textarea.value.substring(start, end);
    const beforeText = this.textarea.value.substring(0, start);
    const afterText = this.textarea.value.substring(end);

    let newText = '';
    let newCursorPos = start;

    switch (action) {
      case 'bold':
        if (selectedText) {
          newText = `<strong>${selectedText}</strong>`;
          newCursorPos = start + newText.length;
        } else {
          newText = '<strong></strong>';
          newCursorPos = start + 8; // Position cursor inside tags
        }
        break;

      case 'italic':
        if (selectedText) {
          newText = `<em>${selectedText}</em>`;
          newCursorPos = start + newText.length;
        } else {
          newText = '<em></em>';
          newCursorPos = start + 4;
        }
        break;

      case 'underline':
        if (selectedText) {
          newText = `<u>${selectedText}</u>`;
          newCursorPos = start + newText.length;
        } else {
          newText = '<u></u>';
          newCursorPos = start + 3;
        }
        break;

      case 'ul':
        if (selectedText) {
          const lines = selectedText.split('\n');
          const listItems = lines.map(line => line.trim() ? `  <li>${line.trim()}</li>` : '').filter(Boolean);
          newText = `<ul>\n${listItems.join('\n')}\n</ul>`;
        } else {
          newText = '<ul>\n  <li></li>\n</ul>';
          newCursorPos = start + 10; // Position cursor inside first li
        }
        break;

      case 'ol':
        if (selectedText) {
          const lines = selectedText.split('\n');
          const listItems = lines.map(line => line.trim() ? `  <li>${line.trim()}</li>` : '').filter(Boolean);
          newText = `<ol>\n${listItems.join('\n')}\n</ol>`;
        } else {
          newText = '<ol>\n  <li></li>\n</ol>';
          newCursorPos = start + 10; // Position cursor inside first li
        }
        break;

      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          if (selectedText) {
            newText = `<a href="${url}">${selectedText}</a>`;
            newCursorPos = start + newText.length;
          } else {
            const linkText = prompt('Enter link text:') || 'Link';
            newText = `<a href="${url}">${linkText}</a>`;
            newCursorPos = start + newText.length;
          }
        } else {
          return; // Cancel if no URL provided
        }
        break;

      default:
        return;
    }

    // Update textarea content
    this.textarea.value = beforeText + newText + afterText;
    
    // Set cursor position
    this.textarea.focus();
    this.textarea.setSelectionRange(newCursorPos, newCursorPos);
    
    // Trigger change event
    this.textarea.dispatchEvent(new Event('change'));
  }
}

// Initialize rich text editors when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find all textareas in admin forms
  const textareas = document.querySelectorAll('.admin-form textarea');
  
  textareas.forEach(textarea => {
    // Skip if already initialized
    if (textarea.parentNode.querySelector('.rich-toolbar')) {
      return;
    }
    
    // Initialize rich text editor
    new RichTextEditor(textarea);
  });
});

// Re-initialize for dynamically added textareas
window.initRichTextEditor = function(textarea) {
  if (textarea && !textarea.parentNode.querySelector('.rich-toolbar')) {
    new RichTextEditor(textarea);
  }
};