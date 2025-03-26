const Category = require("../model/category");

const categoryController = {

    list: async (req, res) => {
        // const successMessage = req.flash("success");
        // const errorMessage = req.flash("error");

        // const messages = {};
        // if (successMessage.length > 0) {
        //     messages.success = successMessage[0];
        // }
        // if (errorMessage.length > 0) {
        //     messages.error = errorMessage[0];
        // }

        try {
            const category = await Category.find(); 
            res.render("categoryList", { category });
        } catch (error) {
            res.status(500).send("Lỗi khi lấy danh sách danh mục: " + error.message);
        }
    },

    createForm: (req, res) => {
        res.render("categoryCreate");
    },

   create: async (req, res) => {
        const { name, description } = req.body;
        console.log("Dữ liệu nhận được:", req.body); 

        if (!name || typeof name !== "string" || name.trim() === "") {
            // req.flash("error", "Vui lòng nhập tên danh mục hợp lệ!");
            return res.redirect("/category/create");
        }

        try {
            const trimmedName = name.trim();
            const isDuplicate = await Category.findOne({ name: trimmedName });
            if (isDuplicate) {
                // req.flash("error", "Tên danh mục đã tồn tại, vui lòng chọn tên khác!");
                return res.redirect("/category/create");
            }

            const newCategory = new Category({
                name: trimmedName,
                description: description || "",
            });
            await newCategory.save();

            // req.flash("success", "Thêm danh mục thành công!");
            res.redirect("/category");
        } catch (error) {
            res.status(500).send("Lỗi khi tạo danh mục: " + error.message);
        }
    },
};

module.exports = categoryController;