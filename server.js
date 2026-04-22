const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Redirect root to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Routes
app.use('/', authRoutes);
app.use('/', employeeRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
