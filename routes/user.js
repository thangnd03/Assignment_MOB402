const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }

});

const upload = multer({ storage: storage });
const userController = require('../controllers/userController');
const { checkAccount, requireLogin, checkAdmin, checkRole } = require('../middleware/auth');


/* GET users listing. */
router.get('/',checkAdmin, userController.getListUser);

router.get('/add',checkAdmin, userController.getFormAddUser);
router.post('/add', checkAdmin,checkAccount, upload.single('image'), userController.postAddUser);

// xóa
router.post('/delete/:_id',checkAdmin, userController.postDeleteUser);

// sửa
router.get('/edit/:_id',checkRole,(req,res,next) => {
    const currentUser = req.user; // Lấy thông tin người dùng hiện tại

  // Nếu người dùng hiện tại là admin hoặc là chính người dùng được sửa thông tin
  if (currentUser.roles == "admin" || currentUser._id.toString() == req.params._id) {
    // Cho phép truy cập vào route sửa thông tin người dùng
    next();
  } else {
    // Người dùng không có quyền truy cập vào route này
    res.status(403).send('Bạn không có quyền truy cập vào trang này!');
  }
},userController.getFormEditInfo);
router.post('/edit/:_id',checkRole,upload.single('image'), userController.postEditUser);

// tìm kiếm
router.get('/search',checkAdmin, userController.getListUser);
router.post('/search',checkAdmin, userController.postSearchUser);




module.exports = router