const { requireLogin, checkAdmin } = require('../middleware/auth');
const loginRouter = require('../routes/login');
const signupRouter = require('../routes/signup');
const homeRouter = require('../routes/home');
const categoryRouter = require('../routes/category');
const productRouter = require('../routes/product');
const userRouter = require('../routes/user');
const UserModel = require('../model/Users');
function route(app) {
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
    app.use('/product',requireLogin, productRouter);
    app.use('/home',requireLogin, homeRouter);
    app.use('/category',requireLogin, categoryRouter);
    app.use('/user',requireLogin,userRouter);
    app.get('/logout', requireLogin, async (req, res) => {
        try {
            console.log("Logout");
            console.log(req.user);
            res.clearCookie("token");
            const userId = req.user._id;
            await UserModel.userModel.findByIdAndUpdate(userId,{token:null});
            console.log(req.user);
            console.log("Đăng xuất thành công");
            res.redirect('/login');
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message)
        }
    });
    app.use('/', requireLogin, (req, res) => {
        res.redirect('home');
    });




}

module.exports = route;