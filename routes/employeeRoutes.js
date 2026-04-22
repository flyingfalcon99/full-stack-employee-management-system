const express = require('express');
const router = express.Router();
const { getEmployees, saveEmployees, getUsers } = require('../utils/fileHandler');

// --- Middleware for Authentication and Authorization ---

const requireAuth = (req, res, next) => {
    const session = req.cookies.session;
    if (!session) {
        return res.redirect('/login');
    }
    const users = getUsers();
    const user = users.find(u => u.username === session);
    if (!user) {
        res.clearCookie('session');
        return res.redirect('/login');
    }
    req.user = user;
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Forbidden: Admin access required');
    }
    next();
};

// --- View Routes ---

router.get('/dashboard', requireAuth, (req, res) => {
    if (req.user.role === 'admin') {
        return res.redirect('/admin/dashboard');
    }
    const employees = getEmployees();
    res.render('user-dashboard', { employees, user: req.user });
});

router.get('/admin/dashboard', requireAuth, requireAdmin, (req, res) => {
    const employees = getEmployees();
    res.render('admin-dashboard', { employees, user: req.user });
});

// --- API Routes (for Postman testing and AJAX calls) ---

// Get all employees
router.get('/api/employees', (req, res) => {
    const employees = getEmployees();
    res.json(employees);
});

// Get a single employee
router.get('/api/employees/:id', (req, res) => {
    const employees = getEmployees();
    const emp = employees.find(e => e.id === req.params.id);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
});

// Create employee
router.post('/api/employees', (req, res) => {
    const { name, email, department, contact } = req.body;
    if (!name || !email || !department || !contact) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const employees = getEmployees();
    const newEmployee = {
        id: Date.now().toString(),
        name,
        email,
        department,
        contact
    };
    employees.push(newEmployee);
    saveEmployees(employees);
    
    res.status(201).json(newEmployee);
});

// Update employee
router.put('/api/employees/:id', (req, res) => {
    const { name, email, department, contact } = req.body;
    const employees = getEmployees();
    const index = employees.findIndex(e => e.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    employees[index] = { ...employees[index], name, email, department, contact };
    saveEmployees(employees);
    
    res.json(employees[index]);
});

// Delete employee
router.delete('/api/employees/:id', (req, res) => {
    const employees = getEmployees();
    const index = employees.findIndex(e => e.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    const deleted = employees.splice(index, 1);
    saveEmployees(employees);
    
    res.json(deleted[0]);
});

module.exports = router;
