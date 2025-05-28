// Theme Switcher System
class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Initialize floating navigation
        this.initFloatingNav();
        
        // Initialize page transitions
        this.initPageTransitions();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initThemeMenu());
        } else {
            this.initThemeMenu();
        }
    }

    initThemeMenu() {
        // Create theme menu if it doesn't exist
        const nav = document.querySelector('#navbar');
        if (nav && !document.querySelector('.theme-menu')) {
            const themeMenu = this.createThemeMenu();
            // Insert before the last nav item
            const lastItem = nav.lastElementChild;
            nav.insertBefore(themeMenu, lastItem);
        }

        // Set up event listeners
        this.setupEventListeners();
    }

    createThemeMenu() {
        const li = document.createElement('li');
        li.className = 'theme-menu';
        
        const themes = {
            basic: [
                { id: 'light', name: 'Light', colors: ['#ffffff', '#333333'] },
                { id: 'dark', name: 'Dark', colors: ['#1a1a1a', '#e0e0e0'] }
            ],
            afl: [
                { id: 'afl-adelaide', name: 'Adelaide Crows', colors: ['#002f5f', '#e21e31'] },
                { id: 'afl-brisbane', name: 'Brisbane Lions', colors: ['#a30046', '#0033a0'] },
                { id: 'afl-carlton', name: 'Carlton', colors: ['#002f5f', '#ffffff'] },
                { id: 'afl-collingwood', name: 'Collingwood', colors: ['#000000', '#ffffff'] },
                { id: 'afl-essendon', name: 'Essendon', colors: ['#cc0000', '#000000'] },
                { id: 'afl-fremantle', name: 'Fremantle', colors: ['#2a0e4f', '#ffffff'] },
                { id: 'afl-geelong', name: 'Geelong', colors: ['#001f3f', '#ffffff'] },
                { id: 'afl-goldcoast', name: 'Gold Coast', colors: ['#f4002e', '#fed102'] },
                { id: 'afl-gws', name: 'GWS Giants', colors: ['#f15a22', '#4a4a4a'] },
                { id: 'afl-hawthorn', name: 'Hawthorn', colors: ['#4d2004', '#fbbf15'] },
                { id: 'afl-melbourne', name: 'Melbourne', colors: ['#003c71', '#cc0000'] },
                { id: 'afl-northmelbourne', name: 'North Melbourne', colors: ['#003c71', '#ffffff'] },
                { id: 'afl-portadelaide', name: 'Port Adelaide', colors: ['#008aab', '#000000'] },
                { id: 'afl-richmond', name: 'Richmond', colors: ['#000000', '#ffd200'] },
                { id: 'afl-stkilda', name: 'St Kilda', colors: ['#000000', '#ed0f05'] },
                { id: 'afl-sydney', name: 'Sydney', colors: ['#ed171f', '#ffffff'] },
                { id: 'afl-westcoast', name: 'West Coast', colors: ['#002b5c', '#f2a900'] },
                { id: 'afl-bulldogs', name: 'Western Bulldogs', colors: ['#014896', '#dc2830'] }
            ]
        };

        li.innerHTML = `
            <button class="theme-toggle" aria-label="Change Theme">
                <span class="theme-icon">🎨</span>
                <span>Theme</span>
            </button>
            <div class="theme-dropdown" id="themeDropdown">
                <div class="theme-section">
                    <h4>Basic Themes</h4>
                    ${themes.basic.map(theme => this.createThemeOption(theme)).join('')}
                </div>
                <div class="theme-section">
                    <h4>AFL Team Themes</h4>
                    ${themes.afl.map(theme => this.createThemeOption(theme)).join('')}
                </div>
            </div>
        `;

        return li;
    }

    createThemeOption(theme) {
        const isActive = this.currentTheme === theme.id ? 'active' : '';
        return `
            <div class="theme-option ${isActive}" data-theme="${theme.id}">
                <div class="theme-preview split" style="--preview-primary: ${theme.colors[0]}; --preview-secondary: ${theme.colors[1]}"></div>
                <span>${theme.name}</span>
            </div>
        `;
    }

    setupEventListeners() {
        // Theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('themeDropdown');
                dropdown.classList.toggle('show');
            });
        }

        // Theme options
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.switchTheme(theme);
                document.getElementById('themeDropdown').classList.remove('show');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-menu')) {
                const dropdown = document.getElementById('themeDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
        });
    }

    switchTheme(theme) {
        // Add transition class
        document.body.classList.add('theme-transitioning');
        
        // Apply new theme
        this.applyTheme(theme);
        
        // Update active state
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });

        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    initFloatingNav() {
        const nav = document.querySelector('.topnav');
        if (!nav) return;

        let lastScroll = 0;
        const navHeight = nav.offsetHeight;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > navHeight) {
                nav.classList.add('floating');
                
                // Add padding to body to prevent content jump
                if (!document.body.style.paddingTop) {
                    document.body.style.paddingTop = navHeight + 'px';
                }
                
                // Hide/show based on scroll direction
                if (currentScroll > lastScroll && currentScroll > navHeight * 2) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }
            } else {
                nav.classList.remove('floating');
                document.body.style.paddingTop = '';
            }

            lastScroll = currentScroll;
        });
    }

    initPageTransitions() {
        // Add transition class to main content
        const mainContent = document.querySelector('main, .intro, .about, .work, .projects, .contact');
        if (mainContent) {
            mainContent.classList.add('page-transition-enter');
        }

        // Intercept navigation clicks for smooth transitions
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin) && !link.target) {
                const url = new URL(link.href);
                
                // Skip if it's an anchor link on the same page
                if (url.pathname === window.location.pathname && url.hash) {
                    return;
                }
                
                // Skip admin links
                if (url.pathname.includes('/admin')) {
                    return;
                }

                e.preventDefault();
                this.navigateWithTransition(link.href);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.href, false);
        });
    }

    navigateWithTransition(url) {
        const content = document.querySelector('main, .intro, .about, .work, .projects, .contact');
        if (!content) {
            window.location.href = url;
            return;
        }

        // Start exit transition
        content.classList.add('page-transition-active');

        setTimeout(() => {
            this.loadPage(url, true);
        }, 300);
    }

    async loadPage(url, updateHistory) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            
            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Update the content
            const newContent = doc.querySelector('main, .intro, .about, .work, .projects, .contact');
            const oldContent = document.querySelector('main, .intro, .about, .work, .projects, .contact');
            
            if (newContent && oldContent) {
                oldContent.parentNode.replaceChild(newContent, oldContent);
                
                // Update title
                document.title = doc.title;
                
                // Update nav active state
                this.updateNavActiveState(url);
                
                // Add enter transition
                newContent.classList.add('page-transition-enter');
                
                // Update history
                if (updateHistory) {
                    window.history.pushState({}, doc.title, url);
                }
                
                // Re-initialize any scripts needed for the new content
                this.reinitializeScripts();
            }
        } catch (error) {
            console.error('Page transition failed:', error);
            window.location.href = url;
        }
    }

    updateNavActiveState(url) {
        const path = new URL(url).pathname;
        document.querySelectorAll('#navbar a').forEach(link => {
            const linkPath = new URL(link.href).pathname;
            link.classList.toggle('active', linkPath === path);
        });
    }

    reinitializeScripts() {
        // Re-run any initialization scripts needed for dynamic content
        if (typeof initCollapsibles === 'function') {
            initCollapsibles();
        }
    }
}

// Initialize theme switcher
const themeSwitcher = new ThemeSwitcher();