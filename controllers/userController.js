// Lấy danh sách tài khoản
var { users } = require('../middleware/auth');

exports.getListUser = (req, res, next) => {
    const listUser = users.map((item) => item);
    res.render('./users/listUser', { listUser: listUser });
}

// Thêm tài khoản:
exports.getFormAddUser = (req, res, next) => {
    res.render('./users/addUser');
}
exports.postAddUser = (req, res, next) => {
    console.log(req.body);
    const user = {
        id: users[users.length - 1].id + 1,
        email: req.body.email,
        pass: req.body.pass,
        name: req.body.name,
        image: req.body.image,
    }
    users.push(user);
    res.redirect('/user/');
}

// Sửa tài khoản
exports.getFormEditUser = (req, res, next) => {
    console.log(req.params);
    let itemUser = users.find((item) => item.id == req.params.id);
    if (itemUser == null) {
        res.send('Không tìm thấy bản ghi');
    }
    res.render('./users/updateUser', { itemUser: itemUser });
}
exports.postEditUser = (req, res, next) => {
    console.log(req.body);
    const user = {
        id: req.params.id,
        email: req.body.email,
        pass: req.body.pass,
        name: req.body.name,
        image: req.body.image,
    }
    const newUsers = users.map((item) => {
        if (item.id == user.id) {
            item = user;
        }
        return item;
    })
    users = newUsers;
    res.redirect('/user/');
}

// Xóa tài khoản:
exports.getFormDeleteUser = (req, res, next) => {
    console.log(req.params);
    let itemUser = users.find((item) => item.id == req.params.id);
    if (itemUser == null) {
        res.send("Không tìm thấy bản ghi");
    }
    res.render("./users/deleteUser", { itemUser: itemUser });
}
exports.postDeleteUser = (req, res, next) => {
    var newUsers = users.filter((item) => item.id != req.params.id);
    users = newUsers;
    res.redirect('/user/');
}

exports.postSearchUser = (req, res, next) => {
    console.log(req.body.nameSearch);
    const itemUsers = users.filter((item) => item.name == req.body.nameSearch);
    console.log(itemUsers);
    if (itemUsers != null) {
        res.render("./users/listUser", { listUser: itemUsers });
    }
    else { res.send("Không tìm thấy bản ghi"); }
}