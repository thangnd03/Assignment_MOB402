const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path')
const route = require('./routes/index');

app.use('/uploads', express.static('uploads'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('.hbs', expressHbs.engine({
    extname: '.hbs', helpers: {
        sum: (a, b) => a + b
    }
}));
app.set('view engine', '.hbs');
app.set('views', './views');


// app.get('/login', function (req, res) {
//     res.render('login',{layout:'form'});
// });

// // Xử lý yêu cầu đăng nhập
// app.post('/login', function (req, res) {
//     const username = req.body.username;
//     const password = req.body.password;
//     // Kiểm tra tài khoản và mật khẩu
//     if (username === 'admin' && password === 'admin') {
//         res.send('Login successful');
//     } else {
//         res.send('Login failed');
//     }
// });

// app.get('/signup', function (req, res) {
//     res.render('signup',{layout:'form'});
// });

// app.get('/',function(req,res){
//     res.render('home');
// });

route(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})