
var users = [
    {id:1, email: 'user1@gmail.com', pass: '1',name:'Nguyễn Văn A',image:"https://avatars.githubusercontent.com/u/1?v=4" },
    {id:2, email: 'user2@gmail.com', pass: '1',name:'Nguyễn Văn B',image:"https://avatars.githubusercontent.com/u/2?v=4"},
    {id:3, email: 'user3@gmail.com', pass: '1',name:'Nguyễn Văn C',image:"https://avatars.githubusercontent.com/u/3?v=4"},
    {id:4, email: 'user4@gmail.com', pass: '1',name:'Nguyễn Văn D',image:"https://avatars.githubusercontent.com/u/4?v=4" },
];

const checkLogin = (req, res, next) => {
    const { email, pass } = req.body;
    // Kiểm tra thông tin đăng nhập của người dùng
    const user = users.find(user => user.email === email && user.pass === pass);
    if (user) {
        
        next();
    } else {
        // Đăng nhập thất bại
        res.render('login',{layout:'form',err:'Thông tin đăng nhập không chính xác'})
    }
};

const requireLogin = (req, res, next) => {

    res.redirect('/login');

}

module.exports = { requireLogin, checkLogin ,users};