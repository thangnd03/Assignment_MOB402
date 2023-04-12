require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./config/db/index');
const port = 3000;
const route = require('./routes/index');
const session = require('express-session');
const apiRouter   = require('./routes/api');

app.use(cookieParser());
app.set('trust proxy', 1); // trust first proxy

app.use(session({
  secret:process.env.KEY_SESSION, // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
  resave:false,
  saveUninitialized:false
}));

db.connect();
app.use('/uploads', express.static('uploads'));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('.hbs', expressHbs.engine({
    extname: '.hbs', helpers: {
        sum: (a, b) => a + b,
        base64:(buffer) => {
            return buffer.toString('base64');
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/api',apiRouter);
route(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})