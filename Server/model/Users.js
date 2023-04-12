const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.KEY_SECRET;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, },
    pass: { type: String, required: true },
    name: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String
    },
    roles: { type: String, enum: ["admin", "user"], default: 'user' },
    token: {
        type: String, require: false
    }
});

UserSchema.methods.generateAuthToken = async function () {

    const user = this;
    console.log(user);
    const token = jwt.sign({_id:user._id,email:user.email,roles:user.roles}, secretKey);
    // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
    user.token = token;
    await user.save();
    return token;
}

UserSchema.statics.findByCredentials = async (email, pass) => {

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error({ error: 'Không tồn tại user' })
    }

    const isPasswordMatch = await bcrypt.compare(pass, user.pass)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Sai password' })
        
    }
    return user;
}
let userModel = mongoose.model('user', UserSchema);
module.exports = { userModel };