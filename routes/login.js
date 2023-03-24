const express = require('express');
const router = express.Router();
const { checkLogin, requireLogin } = require('../middleware/auth');

// Đăng nhập
router.get('/', (req, res) => {
    res.render('login', { layout: 'form' });
});

router.post('/', checkLogin, (req, res) => {
    res.redirect('home');
});

module.exports = router;