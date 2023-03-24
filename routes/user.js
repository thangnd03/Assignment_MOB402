const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.getListUser);

router.get('/add',userController.getFormAddUser);
router.post('/add',userController.postAddUser);
// xóa
router.get('/delete/:id',userController.getFormDeleteUser);
router.post('/delete/:id',userController.postDeleteUser);

// sửa
router.get('/edit/:id',userController.getFormEditUser);
router.post('/edit/:id',userController.postEditUser);

module.exports = router