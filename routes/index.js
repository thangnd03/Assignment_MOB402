const { requireLogin } = require('../middleware/auth');
const loginRouter = require('../routes/login');
const signupRouter = require('../routes/signup');
const homeRouter = require('../routes/home');
const categoryRouter = require('../routes/category');
const productRouter = require('../routes/product');
const userRouter = require('../routes/user');
function route(app) {
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
    app.use('/home',homeRouter);
    app.use('/product',productRouter);
    app.use('/category',categoryRouter);
    app.use('/user',userRouter);
    app.use('/', requireLogin, (req, res) => {
        res.redirect('home');
    });



}

module.exports = route;