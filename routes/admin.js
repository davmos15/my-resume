const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { isAuthenticated, isGuest } = require('../middleware/auth');
const { getAsync, runAsync, allAsync } = require('../database/db');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        // Allow all file types
        cb(null, true);
    }
});

// Login page
router.get('/login', isGuest, (req, res) => {
    res.render('admin/login', { title: 'Admin Login' });
});

// Login handler
router.post('/login', isGuest, [
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error_msg', 'Please fill in all fields');
        return res.redirect('/admin/login');
    }

    const { username, password } = req.body;

    try {
        const user = await getAsync('SELECT * FROM users WHERE username = ?', [username]);
        
        if (!user) {
            req.flash('error_msg', 'Invalid credentials');
            return res.redirect('/admin/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            req.flash('error_msg', 'Invalid credentials');
            return res.redirect('/admin/login');
        }

        req.session.user = {
            id: user.id,
            username: user.username
        };

        req.flash('success_msg', 'Welcome back!');
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error_msg', 'An error occurred during login');
        res.redirect('/admin/login');
    }
});

// Dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const stats = {
            projects: await getAsync('SELECT COUNT(*) as count FROM projects WHERE is_active = 1'),
            pages: await getAsync('SELECT COUNT(DISTINCT page_name) as count FROM page_content'),
            files: await getAsync('SELECT COUNT(*) as count FROM files')
        };

        res.render('admin/dashboard', { 
            title: 'Dashboard',
            layout: 'layouts/admin',
            activePage: 'dashboard',
            stats
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.render('admin/dashboard', { 
            title: 'Dashboard',
            layout: 'layouts/admin',
            activePage: 'dashboard',
            stats: { projects: { count: 0 }, pages: { count: 0 }, files: { count: 0 } }
        });
    }
});

// Page content management
router.get('/pages', isAuthenticated, async (req, res) => {
    try {
        const pages = await allAsync('SELECT DISTINCT page_name FROM page_content ORDER BY page_name');
        res.render('admin/pages', { 
            title: 'Page Content',
            layout: 'layouts/admin',
            activePage: 'pages',
            pages
        });
    } catch (error) {
        console.error('Pages error:', error);
        req.flash('error_msg', 'Error loading pages');
        res.redirect('/admin/dashboard');
    }
});

// Edit page content
router.get('/pages/:pageName', isAuthenticated, async (req, res) => {
    const { pageName } = req.params;
    
    try {
        const sections = await allAsync(
            'SELECT * FROM page_content WHERE page_name = ? ORDER BY section_name',
            [pageName]
        );
        
        res.render('admin/edit-page', {
            title: `Edit ${pageName} Page`,
            layout: 'layouts/admin',
            activePage: 'pages',
            pageName,
            sections
        });
    } catch (error) {
        console.error('Edit page error:', error);
        req.flash('error_msg', 'Error loading page content');
        res.redirect('/admin/pages');
    }
});

// Update page content
router.post('/pages/:pageName', isAuthenticated, async (req, res) => {
    const { pageName } = req.params;
    const updates = req.body;
    
    try {
        for (const [sectionName, content] of Object.entries(updates)) {
            await runAsync(
                'UPDATE page_content SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE page_name = ? AND section_name = ?',
                [content, pageName, sectionName]
            );
        }
        
        req.flash('success_msg', 'Page content updated successfully');
        res.redirect(`/admin/pages/${pageName}`);
    } catch (error) {
        console.error('Update page error:', error);
        req.flash('error_msg', 'Error updating page content');
        res.redirect(`/admin/pages/${pageName}`);
    }
});

// Projects management
router.get('/projects', isAuthenticated, async (req, res) => {
    try {
        const projects = await allAsync('SELECT * FROM projects ORDER BY display_order, id DESC');
        res.render('admin/projects', {
            title: 'Projects',
            layout: 'layouts/admin',
            activePage: 'projects',
            projects
        });
    } catch (error) {
        console.error('Projects error:', error);
        req.flash('error_msg', 'Error loading projects');
        res.redirect('/admin/dashboard');
    }
});

// Add new project form
router.get('/projects/new', isAuthenticated, (req, res) => {
    res.render('admin/project-form', {
        title: 'Add New Project',
        layout: 'layouts/admin',
        activePage: 'projects',
        project: null
    });
});

// Create new project
router.post('/projects/new', isAuthenticated, async (req, res) => {
    const { title, emoji, subtitle, description, technologies, github_link, live_link, display_order, image_path } = req.body;
    
    try {
        await runAsync(
            `INSERT INTO projects (title, emoji, subtitle, description, technologies, github_link, live_link, display_order, image_path, is_active) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [title, emoji || '🚀', subtitle || null, description, technologies, github_link || null, live_link || null, display_order || 0, image_path || null]
        );
        
        req.flash('success_msg', 'Project added successfully');
        res.redirect('/admin/projects');
    } catch (error) {
        console.error('Create project error:', error);
        req.flash('error_msg', 'Error creating project');
        res.redirect('/admin/projects/new');
    }
});

// Edit project form
router.get('/projects/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const project = await getAsync('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        
        if (!project) {
            req.flash('error_msg', 'Project not found');
            return res.redirect('/admin/projects');
        }
        
        res.render('admin/project-form', {
            title: 'Edit Project',
            layout: 'layouts/admin',
            activePage: 'projects',
            project
        });
    } catch (error) {
        console.error('Edit project error:', error);
        req.flash('error_msg', 'Error loading project');
        res.redirect('/admin/projects');
    }
});


// Delete project
router.get('/projects/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await runAsync('DELETE FROM projects WHERE id = ?', [req.params.id]);
        req.flash('success_msg', 'Project deleted successfully');
        res.redirect('/admin/projects');
    } catch (error) {
        console.error('Delete project error:', error);
        req.flash('error_msg', 'Error deleting project');
        res.redirect('/admin/projects');
    }
});

// Resume management
router.get('/resume', isAuthenticated, async (req, res) => {
    try {
        const sections = await allAsync('SELECT * FROM resume_sections ORDER BY section_type, display_order');
        res.render('admin/resume', {
            title: 'Resume',
            layout: 'layouts/admin',
            activePage: 'resume',
            sections
        });
    } catch (error) {
        console.error('Resume error:', error);
        req.flash('error_msg', 'Error loading resume sections');
        res.redirect('/admin/dashboard');
    }
});

// Add new resume section form
router.get('/resume/new', isAuthenticated, (req, res) => {
    res.render('admin/resume-form', {
        title: 'Add Resume Section',
        layout: 'layouts/admin',
        activePage: 'resume',
        section: null
    });
});

// Create new resume section
router.post('/resume/new', isAuthenticated, async (req, res) => {
    const { section_type, title, subtitle, date_range, description, display_order } = req.body;
    
    try {
        await runAsync(
            `INSERT INTO resume_sections (section_type, title, subtitle, date_range, description, display_order, is_active) 
             VALUES (?, ?, ?, ?, ?, ?, 1)`,
            [section_type, title, subtitle || null, date_range || null, description || null, display_order || 0]
        );
        
        req.flash('success_msg', 'Resume section added successfully');
        res.redirect('/admin/resume');
    } catch (error) {
        console.error('Create resume section error:', error);
        req.flash('error_msg', 'Error creating resume section');
        res.redirect('/admin/resume/new');
    }
});

// Edit resume section form
router.get('/resume/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const section = await getAsync('SELECT * FROM resume_sections WHERE id = ?', [req.params.id]);
        
        if (!section) {
            req.flash('error_msg', 'Resume section not found');
            return res.redirect('/admin/resume');
        }
        
        res.render('admin/resume-form', {
            title: 'Edit Resume Section',
            layout: 'layouts/admin',
            activePage: 'resume',
            section
        });
    } catch (error) {
        console.error('Edit resume section error:', error);
        req.flash('error_msg', 'Error loading resume section');
        res.redirect('/admin/resume');
    }
});

// Update resume section
router.post('/resume/edit/:id', isAuthenticated, async (req, res) => {
    const { section_type, title, subtitle, date_range, description, display_order, is_active } = req.body;
    
    try {
        await runAsync(
            `UPDATE resume_sections SET section_type = ?, title = ?, subtitle = ?, 
             date_range = ?, description = ?, display_order = ?, is_active = ?
             WHERE id = ?`,
            [section_type, title, subtitle || null, date_range || null, description || null, 
             display_order || 0, is_active ? 1 : 0, req.params.id]
        );
        
        req.flash('success_msg', 'Resume section updated successfully');
        res.redirect('/admin/resume');
    } catch (error) {
        console.error('Update resume section error:', error);
        req.flash('error_msg', 'Error updating resume section');
        res.redirect(`/admin/resume/edit/${req.params.id}`);
    }
});

// Delete resume section
router.get('/resume/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await runAsync('DELETE FROM resume_sections WHERE id = ?', [req.params.id]);
        req.flash('success_msg', 'Resume section deleted successfully');
        res.redirect('/admin/resume');
    } catch (error) {
        console.error('Delete resume section error:', error);
        req.flash('error_msg', 'Error deleting resume section');
        res.redirect('/admin/resume');
    }
});

// File upload handler
router.post('/upload', isAuthenticated, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        await runAsync(
            'INSERT INTO files (filename, original_name, mime_type, size, path) VALUES (?, ?, ?, ?, ?)',
            [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, req.file.path]
        );

        res.json({
            success: true,
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: `/uploads/${req.file.filename}`
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Error saving file information' });
    }
});

// Files management
router.get('/files', isAuthenticated, async (req, res) => {
    try {
        const files = await allAsync('SELECT * FROM files ORDER BY uploaded_at DESC');
        res.render('admin/files', {
            title: 'Files',
            layout: 'layouts/admin',
            activePage: 'files',
            files
        });
    } catch (error) {
        console.error('Files error:', error);
        req.flash('error_msg', 'Error loading files');
        res.redirect('/admin/dashboard');
    }
});

// Get files list (API)
router.get('/files/list', isAuthenticated, async (req, res) => {
    try {
        const files = await allAsync('SELECT * FROM files ORDER BY uploaded_at DESC');
        res.json(files);
    } catch (error) {
        console.error('Files list error:', error);
        res.status(500).json({ error: 'Error loading files' });
    }
});

// Delete file
router.get('/files/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const file = await getAsync('SELECT * FROM files WHERE id = ?', [req.params.id]);
        if (file) {
            // Delete physical file
            const fs = require('fs');
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            // Delete from database
            await runAsync('DELETE FROM files WHERE id = ?', [req.params.id]);
        }
        req.flash('success_msg', 'File deleted successfully');
        res.redirect('/admin/files');
    } catch (error) {
        console.error('Delete file error:', error);
        req.flash('error_msg', 'Error deleting file');
        res.redirect('/admin/files');
    }
});

// Reorder projects
router.post('/projects/reorder', isAuthenticated, async (req, res) => {
    const { updates } = req.body;
    
    try {
        for (const update of updates) {
            await runAsync(
                'UPDATE projects SET display_order = ? WHERE id = ?',
                [update.display_order, update.id]
            );
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Reorder projects error:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// Reorder resume sections
router.post('/resume/reorder', isAuthenticated, async (req, res) => {
    const { updates } = req.body;
    
    try {
        for (const update of updates) {
            await runAsync(
                'UPDATE resume_sections SET display_order = ? WHERE id = ?',
                [update.display_order, update.id]
            );
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Reorder resume sections error:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// Handle resume form with pre-selected type
router.get('/resume/new', isAuthenticated, (req, res) => {
    const preSelectedType = req.query.type || '';
    res.render('admin/resume-form', {
        title: 'Add Resume Section',
        layout: 'layouts/admin',
        activePage: 'resume',
        section: null,
        preSelectedType
    });
});

// Change password form
router.get('/change-password', isAuthenticated, (req, res) => {
    res.render('admin/change-password', {
        title: 'Change Password',
        layout: 'layouts/admin',
        activePage: null
    });
});

// Update project image path
router.post('/projects/edit/:id', isAuthenticated, async (req, res) => {
    const { title, emoji, subtitle, description, technologies, github_link, live_link, display_order, is_active, image_path } = req.body;
    
    try {
        await runAsync(
            `UPDATE projects SET title = ?, emoji = ?, subtitle = ?, description = ?, technologies = ?, 
             github_link = ?, live_link = ?, display_order = ?, is_active = ?, image_path = ?
             WHERE id = ?`,
            [title, emoji || '🚀', subtitle || null, description, technologies, github_link || null, live_link || null, 
             display_order || 0, is_active ? 1 : 0, image_path || null, req.params.id]
        );
        
        req.flash('success_msg', 'Project updated successfully');
        res.redirect('/admin/projects');
    } catch (error) {
        console.error('Update project error:', error);
        req.flash('error_msg', 'Error updating project');
        res.redirect(`/admin/projects/edit/${req.params.id}`);
    }
});

// Handle password change
router.post('/change-password', isAuthenticated, [
    body('current_password').notEmpty(),
    body('new_password').isLength({ min: 6 }),
    body('confirm_password').custom((value, { req }) => value === req.body.new_password)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error_msg', 'Please check your input');
        return res.redirect('/admin/change-password');
    }

    const { current_password, new_password } = req.body;

    try {
        const user = await getAsync('SELECT * FROM users WHERE id = ?', [req.session.user.id]);
        
        const isMatch = await bcrypt.compare(current_password, user.password);
        if (!isMatch) {
            req.flash('error_msg', 'Current password is incorrect');
            return res.redirect('/admin/change-password');
        }

        const newHash = await bcrypt.hash(new_password, 10);
        await runAsync('UPDATE users SET password = ? WHERE id = ?', [newHash, user.id]);

        req.flash('success_msg', 'Password changed successfully');
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Change password error:', error);
        req.flash('error_msg', 'Error changing password');
        res.redirect('/admin/change-password');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/admin/login');
    });
});

module.exports = router;