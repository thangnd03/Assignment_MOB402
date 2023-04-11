const Product = require('../../model/Products');
const fs = require('fs');
const path = require('path');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        if (products) {
            return res.status(200).json({ data: products, msg: "Lấy dữ liệu thành công" });
        } else {
            return res.status(204).json({ msg: 'Không có dữ liệu' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: { data: fs.readFileSync(path.join('uploads/' + req.file.filename)), contentType: req.file.mimetype },
            color: req.body.color,
            category: req.body.category,
            idUser: req.user._id
        });
        const newProduct = await product.save();
        return res.status(201).json({ data: newProduct, msg: 'Thêm sản phẩm thành công' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const updates = {};
      if (req.body.name) {
        updates.name = req.body.name;
      }
      if (req.body.price) {
        updates.price = req.body.price;
      }
      if (req.body.color) {
        updates.color = req.body.color;
      }
      if (req.body.category) {
        updates.category = req.body.category;
      }
      if (req.file) {
        updates.image = {
          data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
          contentType: req.file.mimetype,
        };
      }
  
      const product = await ProductModel.findOneAndUpdate({ _id: id,},updates);
  
      if (!product) {
        return res.status(404).json({ msg: 'Không tìm thấy sản phẩm' });
      }
  
      return res.status(200).json({ data: product ,msg:'Sửa sản phẩm thành công'});
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };

exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params._id);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

