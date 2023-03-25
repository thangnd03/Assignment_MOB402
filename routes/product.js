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

// Get List Product
router.get('/', productController.getListProduct);

// thêm
router.get('/add', productController.getFormAddProduct);
router.post('/add', upload.single('image'), productController.postAddProduct);

// xóa
router.get('/delete/:id', productController.getFormDeleteProduct);
router.post('/delete/:id', productController.postDeleteProduct);

// sửa
router.get('/edit/:id', productController.getFormEditProduct);
router.post('/edit/:id',upload.single('image'), productController.postEditProduct);

module.exports = router;
