const express = require('express');
const router = express.Router();
const { checkAccount } = require('../middleware/auth');
const userController = require('../controllers/userController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname; // tên file
        arr = fileName.split('.');
        let newFileName = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != arr.length - 1) {
                newFileName += arr[i];
            } else {
                if (arr[i] != 'jpeg') arr[i] = 'jpeg';
                newFileName += ('-' + Date.now() + '.' + arr[i]);
            }
        }
        req.body.image = 'uploads/' + newFileName;
        cb(null, newFileName);
    }

});

const upload = multer({ storage: storage });

// Đăng ký
router.get('/', (req, res) => {
    res.render('signup', { layout: 'form' });
});

router.post('/', checkAccount,upload.single('image'),userController.postAddUser);

module.exports = router;