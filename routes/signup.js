const express = require('express');
const router = express.Router();
const { checkAccount } = require('../middleware/auth');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const UserModel = require('../model/Users');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }

});

const upload = multer({ storage: storage });

// Đăng ký
router.get('/', (req, res) => {
    res.render('signup', { layout: 'form' });
});

router.post('/',upload.single('image'),checkAccount, async (req, res,next) => {
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(15);
        console.log("Chuoi ngau nhien =  " + salt);

        const user = new UserModel.userModel(req.body);
        user.pass = await bcrypt.hash(req.body.pass, salt);
        user.roles = 'user';
        user.image = {data:fs.readFileSync(path.join('uploads/' + req.file.filename)),contentType:req.file.mimetype};
        const token = await user.generateAuthToken();
        
        let newUser = await user.save();
        fs.unlinkSync(req.file.path);
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;    