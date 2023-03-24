var products = [
    { id: 1, name: 'Áo cộc', price: '50000', image: 'https://onoff.vn/media/catalog/product/cache/ecd9e5267dd6c36af89d5c309a4716fc/H17TS17025.jpg', color: 'Đen', category: 'Áo' },
    { id: 2, name: 'Áo dài tay', price: '50000', image: 'https://linhvnxk.com/wp-content/uploads/2019/12/ao-thun-ni-uni-xuat-nhat-tui-nguc-1.jpg', color: 'Đen', category: 'Áo' },
    { id: 3, name: 'Quần Jean', price: '50000', image: 'https://img.cdn.vncdn.io/cdn-pos/fb2e20-2071/ps/20230109_6ZjO99ReNm9VK4r4.jpg', color: 'Xanh', category: 'Quần' },
    { id: 4, name: 'Áo cộc', price: '50000', image: 'https://dosi-in.com/images/detailed/94/dosiin-mvr-maverick-quan-dui-theu-logo-mvr-short-pants-mvr-9441094410.jpg', color: 'Đen', category: 'Quần' },
];

exports.getListProduct = (req, res, next) => {
    // viết nội dung xử lý cho hàm
    var listProduct = products.map(product => product);
    res.render('./products/listProduct', { layout: 'main', listProduct: listProduct });
}

// Thêm sản phẩm:
exports.getFormAddProduct = (req, res, next) => {
    res.render('./products/addProduct', { layout: 'main' });
}

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const product = {
        id: products[products.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        color: req.body.color,
        category: req.body.category
    }
    products.push(product);
    res.redirect('/product/');
}

// Xóa sản phẩm:
exports.getFormDeleteProduct = (req, res, next) => {
    console.log(req.params);
    let itemProduct = products.find((product) => product.id == req.params.id);
    console.log(itemProduct);
    if (itemProduct == null) {
        res.send("Không tìm thấy bản ghi");
    }
    res.render("./products/deleteProduct", { itemProduct: itemProduct });
}

exports.postDeleteProduct = (req, res, next) => {
    var newProduct = products.filter((product) => product.id != req.params.id);
    products = newProduct;
    res.redirect('/product/');
}

// Sửa sản phẩm:
exports.getFormEditProduct = async (req, res, next) => {
    console.log(req.params);
    let itemProduct = products.find((product) => product.id == req.params.id);
    if (itemProduct == null) {
        res.send("Không tìm thấy bản ghi");
    }
    res.render('./products/updateProduct', { itemProduct: itemProduct });
}
exports.postEditProduct = (req, res, next) => {
    console.log('id' + req.params.id);
    const product = {
        id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        color: req.body.color,
        category: req.body.category
    }
    const newProducts = products.map((item) => {
        if (item.id == product.id) {
            item = product;
        }
        return item;
    })
    products = newProducts;
    res.redirect('/product/');
}

