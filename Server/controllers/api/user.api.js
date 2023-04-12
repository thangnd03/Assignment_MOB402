const md = require('../../model/Users');
const bcrypt = require("bcrypt");
const { btoa } = require('buffer');
const fs = require('fs');
const path = require('path');

exports.listUser = async (req, res, next) => {

    try {
        let list = await md.userModel.find();
        if (list) {
            return res.status(200).json({ data: list, msg: 'Lấy dữ liệu thành công' });
        } else {
            return res.status(204).json({ msg: 'Không có dữ liệu' });
        }

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    // res.json( {status: 1, msg: 'Trang danh sách user'});
}

exports.login = async (req, res, next) => {


    try {

        const user = await md.userModel
            .findByCredentials(req.body.email, req.body.pass)
        if (!user) {
            return res.status(401)
                .json({ error: 'Sai thông tin đăng nhập' })
        }
        // đăng nhập thành công, tạo token làm việc mới
        const token = await user.generateAuthToken()
        

        return res.status(200).json({ _id:user._id,
            name:user.name,
            email:user.email,
            roles:user.roles,
            token:token,
            image:`data:${user.image.contentType};base64,${user.image.data.toString('base64')}`,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }

    // res.json( {status: 1, msg: 'Trang đăng nhập'});

}

exports.reg = async (req, res, next) => {

    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt, req.body);

        const user = new md.userModel(req.body);

        user.pass = await bcrypt.hash(req.body.pass, salt);
        user.roles = 'user';
        if(req.file){
            user.image = { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype }
        }
        const token = await user.generateAuthToken();

        let new_u = await user.save()

        return res.status(201).json({ user:new_u });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }

    // res.json( {status: 1, msg: 'Trang đăng ký'});
}

exports.profile = (req, res, next) => {
    res.send(req.user);

    // res.json( {status: 1, msg: 'Trang thông tin'});
}

exports.logout = async (req, res, next) => {
    try {
        console.log(req.user);
        // req.user.generateAuthToken();
        req.user.token = null; //xóa token
        await req.user.save();
        return res.status(200).json({ msg: 'Đăng xuất thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
    //    res.json( {status: 1, msg: 'Trang đăng xuất'});
}

exports.createUser = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(15);
        const user = new md.userModel({
            email: req.body.email,
            pass: await bcrypt.hash(req.body.pass, salt),
            name: req.body.name,
            image: { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype },
            roles: req.body.roles || 'user'
        });
        const token = await user.generateAuthToken();
        const newUser = await user.save();
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params._id;
        const user = await md.userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Không tìm thấy user'});
        }

        user.email = req.body.email || user.email;
        user.name = req.body.name || user.name;
        if(req.body.pass){
            const salt = await bcrypt.genSalt(15);
            user.pass = await bcrypt.hash(req.body.pass, salt)
        }
        user.image = { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype } || user.image;
        user.roles = req.body.roles || user.roles;
        
        const savedUser = await user.save();
        return res.status(200).json({ data:savedUser,msg: 'Cập nhật thành công' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

exports.deleteUserById = async (req, res, next) => {
    try {
        const user = await md.userModel.findByIdAndDelete(req.params._id);
        if (!user) {
            return res.status(404).json({ msg: 'Không tìm thấy user' });
        }
        res.status(200).json({ msg: 'Xóa thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });   
    }
};