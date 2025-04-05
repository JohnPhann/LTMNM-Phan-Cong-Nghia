const Category = require("../model/category");

const categoryController = {
  
  list: async (req, res) => {
    try {
      const categories = await Category.find();
      res.render("categoryList", { 
        categories,
        error: null 
      });
    } catch (error) {
      res.render("categoryList", { 
        categories: [],
        error: "Lỗi khi lấy danh sách danh mục: " + error.message
      });
    }
  },


  createForm: (req, res) => {
    res.render("categoryCreate", { 
      formData: {}, 
      error: null
    });
  },


  create: async (req, res) => {
    const { name, description } = req.body;

    try {
      if (!name || typeof name !== "string" || name.trim() === "") {
        throw new Error("Vui lòng nhập tên danh mục hợp lệ!");
      }

      const trimmedName = name.trim();
      const isDuplicate = await Category.findOne({ name: trimmedName });
      if (isDuplicate) {
        throw new Error("Tên danh mục đã tồn tại, vui lòng chọn tên khác!");
      }

      await Category.create({
        name: trimmedName,
        description: description || ""
      });

      res.redirect("/category");
    } catch (error) {
      res.render("categoryCreate", {
        formData: req.body || {},
        error: error.message
      });
    }
  },

  editForm: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        throw new Error("Danh mục không tồn tại!");
      }
      
      res.render("categoryEdit", { 
        category,
        formData: category, 
        error: null
      });
    } catch (error) {
      res.redirect("/category");
    }
  },


  edit: async (req, res) => {
    const { name, description } = req.body;
    const categoryId = req.params.id;

    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Danh mục không tồn tại!");
      }

      // Validation
      if (!name || typeof name !== "string" || name.trim() === "") {
        throw new Error("Vui lòng nhập tên danh mục hợp lệ!");
      }

      const trimmedName = name.trim();
      if (trimmedName !== category.name) {
        const isDuplicate = await Category.findOne({ name: trimmedName });
        if (isDuplicate) {
          throw new Error("Tên danh mục đã tồn tại, vui lòng chọn tên khác!");
        }
      }

      category.name = trimmedName;
      category.description = description !== undefined ? description : category.description;

      await category.save();
      res.redirect("/category");
    } catch (error) {
      const category = await Category.findById(categoryId);
      res.render("categoryEdit", { 
        category,
        formData: req.body || category,
        error: error.message
      });
    }
  }
};

module.exports = categoryController;