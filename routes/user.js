const express = require('express');
const router = express.Router();
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
                newFileName += ('-' + Date.now() + '.' + arr[i]);
            }
        }
        req.body.image = '../uploads/' + newFileName;
        cb(null, newFileName);
    }

});

const upload = multer({ storage: storage });
const userController = require('../controllers/userController');
const { checkAccount } = require('../middleware/auth');


/* GET users listing. */
router.get('/', userController.getListUser);

router.get('/add', userController.getFormAddUser);
router.post('/add', checkAccount, upload.single('image'), userController.postAddUser);
// xóa
router.get('/delete/:id', userController.getFormDeleteUser);
router.post('/delete/:id', userController.postDeleteUser);

// sửa
router.get('/edit/:id', userController.getFormEditUser);
router.post('/edit/:id', upload.single('image'), userController.postEditUser);

// tìm kiếm
router.post('/search', userController.postSearchUser);


module.exports = router