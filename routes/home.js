const express = require('express');
const router = express.Router();

// Đăng nhập
router.get('/', (req, res) => {
    res.render('home',{layout:'main'});
});

module.exports = router;