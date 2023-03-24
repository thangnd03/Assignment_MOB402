const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

/* GET product listing. */
router.get('/', categoryController.getListCategory);

// thêm
router.get('/add',categoryController.getFormAddCategory);
router.post('/add',categoryController.postAddCategory);

// xóa
router.get('/delete/:id',categoryController.getFormDeleteCategory);
router.post('/delete/:id',categoryController.postDeleteCategory);

// sửa
router.get('/edit/:id',categoryController.getFormEditCategory);
router.post('/edit/:id',categoryController.postEditCategory);

module.exports = router;