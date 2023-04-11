const express = require('express');
const { requireLogin } = require('../middleware/auth');
const router = express.Router();

router.get('/',requireLogin, (req, res) => {
    res.render('home',{layout:'main',isAdmin:req.user.roles == "admin",user:req.user});
});


module.exports = router;