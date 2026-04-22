const express = require('express');
const router = express.Router();
const { getUsers, saveUsers } = require('../utils/fileHandler');

// --- Middleware to check if already logged in ---
const redirectIfLoggedIn = (req, res, next) => {
    if (req.cookies.session) {
        const users = getUsers();
        const user = users.find(u => u.username === req.cookies.session);
        if (user) {
            if (user.role === 'admin') {
                return res.redirect('/admin/dashboard');
            } else {
                return res.redirect('/dashboard');
            }
        }
    }
    next();
};

// --- GET Routes (Views) ---

router.get('/login', redirectIfLoggedIn, (req, res) => {
    res.render('login', { error: null });
});

router.get('/signup', redirectIfLoggedIn, (req, res) => {
    res.render('signup', { error: null });
});

router.get('/admin-login', redirectIfLoggedIn, (req, res) => {
    res.render('admin-login', { error: null });
});

router.get('/logout', (req, res) => {
    res.clearCookie('session');
    res.redirect('/login');
});

// --- POST Routes (API & Form Handlers) ---

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.render('signup', { error: 'Please provide both username and password' });
    }

    const users = getUsers();
    if (users.some(u => u.username === username)) {
        return res.render('signup', { error: 'Username already exists' });
    }

    const newUser = { username, password, role: 'user' };
    users.push(newUser);
    saveUsers(users);

    res.cookie('session', username, { httpOnly: true });
    res.redirect('/dashboard');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password && u.role === 'user');

    if (!user) {
        return res.render('login', { error: 'Invalid credentials or not a regular user' });
    }

    res.cookie('session', username, { httpOnly: true });
    res.redirect('/dashboard');
});

router.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    
    // For testing/development, auto-create a default admin if none exists
    const hasAdmin = users.some(u => u.role === 'admin');
    if (!hasAdmin && username === 'admin' && password === 'admin') {
        users.push({ username: 'admin', password: 'admin', role: 'admin' });
        saveUsers(users);
        res.cookie('session', 'admin', { httpOnly: true });
        return res.redirect('/admin/dashboard');
    }

    const user = users.find(u => u.username === username && u.password === password && u.role === 'admin');

    if (!user) {
        return res.render('admin-login', { error: 'Invalid admin credentials' });
    }

    res.cookie('session', username, { httpOnly: true });
    res.redirect('/admin/dashboard');
});

module.exports = router;
