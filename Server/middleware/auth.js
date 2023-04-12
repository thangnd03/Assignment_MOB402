const Users = require('../model/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkLogin = async (req, res, next) => {
    try {
        const user = await Users.userModel.findByCredentials(req.body.email, req.body.pass);
        if (!user) {
            res.render('login', { layout: 'form', err: 'Thông tin đăng nhập không chính xác', email: email, pass: pass });
        }

        const token = await user.generateAuthToken();// tạo token cho user
        req.user = user;
        res.cookie("token", token);
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

const checkAccount = async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const user = await Users.userModel.findOne({ email: email });
    if (user) {
        return res.render('signup', { layout: 'form', err: 'Thông tin đăng ký đã được sử dụng', email: email, pass: req.body.pass, name: req.body.name })
    } else {
        next();
    }
}
const checkRole = (req,res,next) =>{
    if(req.user && (req.user.roles == 'user' || req.user.roles == 'admin')){
        next();
    }else{
        res.status(401).json({ msg: 'Unauthorized' });
    }
}

const checkAdmin = async (req, res, next) => {
    if (req.user && req.user.roles == 'admin') {
        next();
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    }
}

const requireLogin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token && !req.user) {
        return res.redirect('/login');
    }
    try {
        const user = req.user || jwt.verify(token, process.env.KEY_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token");
        res.redirect('/login');
    }
}
module.exports = { requireLogin, checkLogin, checkAccount, checkAdmin,checkRole };