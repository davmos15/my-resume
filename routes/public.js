const express = require('express');
const router = express.Router();
const { getAsync, allAsync } = require('../database/db');

// Helper function to get page content
const getPageContent = async (pageName) => {
    const sections = await allAsync(
        'SELECT section_name, content FROM page_content WHERE page_name = ?',
        [pageName]
    );
    
    const content = {};
    sections.forEach(section => {
        content[section.section_name] = section.content;
    });
    
    return content;
};

// Homepage
router.get('/', async (req, res) => {
    try {
        const content = await getPageContent('home');
        res.render('pages/index', {
            title: 'Nadav Moskow - Portfolio',
            content
        });
    } catch (error) {
        console.error('Home page error:', error);
        res.render('pages/index', {
            title: 'Nadav Moskow - Portfolio',
            content: {}
        });
    }
});

// Resume page
router.get('/resume', async (req, res) => {
    try {
        const sections = await allAsync(
            'SELECT * FROM resume_sections WHERE is_active = 1 ORDER BY section_type, display_order'
        );
        
        const groupedSections = sections.reduce((acc, section) => {
            if (!acc[section.section_type]) {
                acc[section.section_type] = [];
            }
            acc[section.section_type].push(section);
            return acc;
        }, {});

        res.render('pages/resume', {
            title: 'Resume - Nadav Moskow',
            sections: groupedSections
        });
    } catch (error) {
        console.error('Resume page error:', error);
        res.render('pages/resume', {
            title: 'Resume - Nadav Moskow',
            sections: {}
        });
    }
});

// About page
router.get('/about', async (req, res) => {
    try {
        const content = await getPageContent('about');
        res.render('pages/about', {
            title: 'About - Nadav Moskow',
            content
        });
    } catch (error) {
        console.error('About page error:', error);
        res.render('pages/about', {
            title: 'About - Nadav Moskow',
            content: {}
        });
    }
});

// Projects page
router.get('/projects', async (req, res) => {
    try {
        const projects = await allAsync(
            'SELECT * FROM projects WHERE is_active = 1 ORDER BY display_order, id DESC'
        );
        
        res.render('pages/projects', {
            title: 'Projects - Nadav Moskow',
            projects
        });
    } catch (error) {
        console.error('Projects page error:', error);
        res.render('pages/projects', {
            title: 'Projects - Nadav Moskow',
            projects: []
        });
    }
});

// Contact page
router.get('/contact', async (req, res) => {
    try {
        const content = await getPageContent('contact');
        res.render('pages/contact', {
            title: 'Contact - Nadav Moskow',
            content
        });
    } catch (error) {
        console.error('Contact page error:', error);
        res.render('pages/contact', {
            title: 'Contact - Nadav Moskow',
            content: {}
        });
    }
});

// Contact form submission
router.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    // Here you would typically:
    // 1. Send an email notification
    // 2. Store the message in database
    // 3. Send confirmation email to user
    
    // For now, just log and redirect with success message
    
    req.flash('success_msg', 'Thank you for your message! I will get back to you soon.');
    res.redirect('/contact');
});

module.exports = router;