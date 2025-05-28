const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    req.flash('error_msg', 'Please log in to access this page');
    res.redirect('/admin/login');
};

const isGuest = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect('/admin/dashboard');
    }
    next();
};

module.exports = {
    isAuthenticated,
    isGuest
};