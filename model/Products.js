const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    image: {
        data: Buffer,
        contentType: String
    },
    color: { type: String },
    category: { type: String },
    idUser: { type: String }
});

module.exports = mongoose.model('product',ProductSchema);