const jwt = require('jsonwebtoken')
const md = require('../model/Users');
require('dotenv').config(); // su dung thu vien doc file env
const chuoi_ky_tu_bi_mat = process.env.KEY_SECRET;

const api_auth = async (req, res, next) => {

    let header_token = req.header('Authorization');

    if (typeof (header_token) == 'undefined') {
        return res.status(403).json({ msg: 'Không xác định token' });
    }

    const token = header_token.replace('Bearer ', '')


    try {
        const data = jwt.verify(token, chuoi_ky_tu_bi_mat)
        console.log(data);
        const user = await md.userModel.findOne({ _id: data._id, token: token })
        if (!user) {
            throw new Error("Không xác định được người dùng")
        }
        req.user = user
        req.token = token
        console.log(req.user);
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: error.message })
    }

}

const api_checkAdmin = async (req, res, next) => {
    if(req.user && req.user.roles == "admin"){
        console.log(req.user.roles);
        next()
    }else{
        console.log('không phải admin');
        return res.status(403).json({ msg: 'Bạn không có quyền truy cập' });
    }
}
module.exports = { api_auth ,api_checkAdmin}