// var products = [
//     { id: 1, name: 'Áo cộc', price: '50000', image: 'https://onoff.vn/media/catalog/product/cache/ecd9e5267dd6c36af89d5c309a4716fc/H17TS17025.jpg', color: 'Đen', category: 'Áo' },
//     { id: 2, name: 'Áo dài tay', price: '50000', image: 'https://linhvnxk.com/wp-content/uploads/2019/12/ao-thun-ni-uni-xuat-nhat-tui-nguc-1.jpg', color: 'Đen', category: 'Áo' },
//     { id: 3, name: 'Quần Jean', price: '50000', image: 'https://img.cdn.vncdn.io/cdn-pos/fb2e20-2071/ps/20230109_6ZjO99ReNm9VK4r4.jpg', color: 'Xanh', category: 'Quần' },
//     { id: 4, name: 'Áo cộc', price: '50000', image: 'https://dosi-in.com/images/detailed/94/dosiin-mvr-maverick-quan-dui-theu-logo-mvr-short-pants-mvr-9441094410.jpg', color: 'Đen', category: 'Quần' },
// ];

const Products = require("../model/Products");
const { multipleMongooseToObject } = require("../ultils/mongoose");
const fs = require('fs');
const path = require('path');

exports.getListProduct = async (req, res, next) => {
    // viết nội dung xử lý cho hàm
    console.log("Get List Product");
    console.log(req.user);
    console.log(req.user.roles == "admin")
    const listProduct = await Products.find();
    res.render('./products/listProduct', { layout: 'main', listProduct: multipleMongooseToObject(listProduct),user:req.user,isAdmin:req.user.roles == "admin"});
}

// Thêm sản phẩm:
exports.getFormAddProduct = (req, res, next) => {
    res.render('./products/addProduct', { layout: 'main',user:req.user,isAdmin:req.user.roles == "admin" ,user:req.user});
}

exports.postAddProduct = async (req, res, next) => {
    console.log("ADD PRODUCT");
    console.log(req.body);
    console.log(req.file);
    console.log(req.file.path);
    const newProducts = new Products({
        name:req.body.name,
        price: req.body.price,
        image: { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype },
        color: req.body.color,
        category: req.body.category,
        idUser:req.user._id
    })
    console.log("SP MỚI");
    console.log(newProducts);
    await Products.insertMany(newProducts);
    res.redirect('/product');
}

// Xóa sản phẩm:
exports.postDeleteProduct = async (req, res, next) => {
    console.log(req.params);
    await Products.deleteOne({ _id: req.params._id });
    res.redirect('/product');
}

// Sửa sản phẩm:
exports.postEditProduct = async (req, res, next) => {
    console.log(req.body);
    console.log(req.params._id);
    console.log(req.file.path);
    const product = await Products.findById(req.params._id);
    product.name = req.body.name;
    product.category = req.body.category;
    product.color = req.body.color;
    product.price = req.body.price;
    if (req.file) {
        product.image = { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype };
        fs.unlinkSync(req.file.path);
    }
    await product.save();

    res.redirect('/product');
}

