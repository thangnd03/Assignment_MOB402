var categories = [
    { id: 1, name: 'Áo' },
    { id: 2, name: 'Quần' }
]
exports.getListCategory = async (req, res, next) => {
    // viết nội dung xử lý cho hàm
    var listCategory = categories.map((category) => category);
    res.render('./categories/listCategory', {
        listCategory: listCategory,
        
    });
}

// Thêm sản phẩm
exports.getFormAddCategory = (req, res, next) => {
    res.render('./categories/addCategory');
}

exports.postAddCategory = (req, res, next) => {
    console.log(req.body);
    const category = {
        id:categories[categories.length - 1].id + 1,
        name:req.body.name,
    }
    categories.push(category);
    res.redirect('/category/');
}

// Xóa thể loại:
exports.getFormDeleteCategory = async (req, res, next) => {
    console.log(req.params);
    let itemCategory = categories.find((item) => item.id == req.params.id);

    console.log(itemCategory);
    if (itemCategory == null) {
        res.send("Không tìm thấy bản ghi");
    }
    res.render("./categories/deleteCategory", { itemCategory: itemCategory });
}
exports.postDeleteCategory = (req, res, next) => {
    var newCategories = categories.filter((item) => item.id != req.params.id);
    categories = newCategories;
    res.redirect('/category/');
}

// Sửa
exports.getFormEditCategory = (req, res, next) => {
    console.log(req.params);
    let itemCategory = categories.find((item) => item.id == req.params.id);
    if (itemCategory == null) {
        res.send("Không tìm thấy bản ghi");
    }
    res.render('./categories/updateCategory', { itemCategory: itemCategory });
}
exports.postEditCategory = (req, res, next) => {
    console.log(req.body);
    console.log(req.params.id);
    const category = {
        id:req.params.id,
        name:req.body.name,
    }
    const newCategories = categories.map((item) => {
        if(item.id == category.id){
            item = category;
        }
        return item;
    });

    categories = newCategories;
    res.redirect('/category/');
}