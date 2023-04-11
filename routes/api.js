const express = require('express');
const router = express.Router();
const api_u = require('../controllers/api/user.api');
const api_p = require('../controllers/api/product.api');
const mdw = require('../middleware/api.auth');
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
 
router.get('/users', mdw.api_auth ,mdw.api_checkAdmin,api_u.listUser); // ds u:  /api/users

router.post('/users/login', api_u.login); // đăng nhập

router.post('/users/reg', api_u.reg); // đăng ký

router.get('/users/profile',mdw.api_auth ,api_u.profile); // lấy thông tin user

router.get('/users/logout',mdw.api_auth, api_u.logout); // đăng xuất

router.post('/users/add',mdw.api_auth,mdw.api_checkAdmin,upload.single('image'),api_u.createUser);

router.post('/users/update/:_id',mdw.api_auth,(req,res,next) => {
    const currentUser = req.user; // Lấy thông tin người dùng hiện tại

  // Nếu người dùng hiện tại là admin hoặc là chính người dùng được sửa thông tin
  if (currentUser.roles == "admin" || currentUser._id.toString() == req.params._id) {
    // Cho phép truy cập vào route sửa thông tin người dùng
    next();
  } else {
    // Người dùng không có quyền truy cập vào route này
    res.status(403).send('Bạn không có quyền truy cập vào trang này!');
  }
},upload.single('image'),api_u.updateUser);

router.post('users/delete/:_id',mdw.api_auth,mdw.api_checkAdmin,api_u.deleteUserById);
// api products

router.get('/products',mdw.api_auth,api_p.getAllProducts);

router.post('/products/add',mdw.api_auth,mdw.api_checkAdmin,upload.single('image'),api_p.createProduct);

router.post('/products/update/:_id',mdw.api_auth,mdw.api_checkAdmin,upload.single('image'),api_p.updateProduct);

router.post('/products/delete/:_id',mdw.api_auth,mdw.api_checkAdmin,api_p.deleteProductById)

module.exports = router;