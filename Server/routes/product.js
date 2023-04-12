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
                if (arr[i] != 'jpeg') arr[i] = 'jpeg';
                newFileName += ('-' + Date.now() + '.' + arr[i]);
            }
        }
        req.body.image = '../uploads/' + newFileName;
        cb(null, newFileName);
    }

});

const upload = multer({ storage: storage });

const productController = require('../controllers/productController');
const { checkAdmin,checkRole } = require('../middleware/auth');

// Get List Product
router.get('/',checkRole,productController.getListProduct);

// thêm
router.get('/add',checkAdmin, productController.getFormAddProduct);
router.post('/add',checkAdmin, upload.single('image'), productController.postAddProduct);

// xóa
router.post('/delete/:_id',checkAdmin,productController.postDeleteProduct);

// sửa
router.post('/edit/:_id',checkAdmin,upload.single('image'), productController.postEditProduct);

module.exports = router;
