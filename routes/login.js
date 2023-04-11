const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/auth');

// Đăng nhập
router.get('/', (req, res) => {
    res.render('login', { layout: 'form', email: req.params.email, pass: req.params.pass });
});

router.post('/', checkLogin, (req, res) => {
    res.redirect('/home');
});

module.exports = router;