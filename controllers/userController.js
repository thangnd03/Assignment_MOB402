const bcrypt = require('bcrypt');
const UserModel = require('../model/Users');
const { multipleMongooseToObject, mongooseToObject } = require('../ultils/mongoose');
const Users = require('../model/Users');
const fs = require('fs');
const path = require('path');

exports.getListUser = async (req, res, next) => {
    console.log(req.user);
    const listUser = await UserModel.userModel.find();
    res.render('./users/listUser', { listUser: multipleMongooseToObject(listUser), isAdmin: req.user.roles == "admin" });
}
// Thêm tài khoản:
exports.getFormAddUser = (req, res, next) => {
    res.render('./users/addUser', { isAdmin: req.user.roles == "admin" });
}

exports.postAddUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(15);
        console.log("Chuoi ngau nhien =  " + salt);
        // res.send(req.file);
        const newUser = new UserModel.userModel({
            email: req.body.email,
            pass: await bcrypt.hash(req.body.pass, salt),
            name: req.body.name,
            image: { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype },
            roles: 'user'
        });
        const token = await newUser.generateAuthToken();
        console.log(newUser);
        await UserModel.userModel.insertMany(newUser);
        fs.unlinkSync(req.file.path);
        res.redirect('/user');
    } catch (error) {
        res.redirect('/user');
        console.log(error);
    }

}

exports.getFormEditInfo = async (req, res, next) => {
    const editUser = await UserModel.userModel.findById(req.user._id);
    res.render('./users/updateUser', { isAdmin: req.user.roles == "admin", editUser: mongooseToObject(editUser) });
}
// Sửa tài khoản

exports.postEditUser = async (req, res, next) => {
    console.log(req.body);
    console.log(req.params._id);
    const user = await UserModel.userModel.findById(req.params._id);
    if (req.pass) {
        const salt = await bcrypt.genSalt(15);
        console.log("Chuoi ngau nhien =  " + salt);
        const pass = await bcrypt.hash(req.body.pass, salt);
        user.pass = pass;
    }
    user.name = req.body.name;
    user.roles = req.body.roles;
    if (req.file) {
        user.image = { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype };
        fs.unlinkSync(req.file.path);
    }
    await user.save();
    if (req.user.roles == 'admin') {
        res.redirect('/user');
    } else {
        res.redirect('/home')
    }
}

exports.postDeleteUser = async (req, res, next) => {
    console.log(req.params);
    await Users.userModel.deleteOne({ _id: req.params._id });
    res.redirect('/user');
}

exports.postSearchUser = async (req, res, next) => {
    console.log(req.body.nameSearch);
    const nameSearch = req.body.nameSearch;
    const userSearch = await Users.userModel.find({ name: { $regex: nameSearch, $options: 'i' } });
    if (userSearch != null) {
        res.render("./users/listUser", { listUser: multipleMongooseToObject(userSearch), value: req.body.nameSearch, isAdmin: req.user.roles == "admin" });
    }
    else { res.render("./users/listUser", { listUser: [], value: req.body.nameSearch, isAdmin: req.user.roles == "admin" }); }
}
