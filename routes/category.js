const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { requireLogin } = require('../middleware/auth');

/* GET product listing. */
router.get('/',requireLogin, categoryController.getListCategory);

// thêm
router.get('/add',requireLogin,categoryController.getFormAddCategory);
router.post('/add',requireLogin,categoryController.postAddCategory);

// xóa
router.post('/delete/:id',requireLogin,categoryController.postDeleteCategory);

// sửa
router.post('/edit/:id',requireLogin,categoryController.postEditCategory);

module.exports = router;