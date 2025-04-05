const Products = require('../model/products');
const Category = require('../model/category');

class ProductController {
  static async index(req, res) {
    try {
      const categoryId = req.query.category_id || null;
      const query = categoryId ? { category: categoryId } : {};
      
      const products = await Products.find(query).populate('category');
      const categories = await Category.find();
      
      res.render("productList", { 
        categories,
        products,
        selectedCategory: categoryId
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

static async createForm(req, res) {
    try {
      const categories = await Category.find();
      res.render("productCreate", { 
        categories,
        formData: {},
        error: null
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async create(req, res) {
    try {
      const { name, description, price, stock, category } = req.body;
      if (!name || !price || !stock || !category) {
        throw new Error("Missing required fields");
      }

      const categoryExists = await Category.findById(category);
      if (!categoryExists) throw new Error("Invalid category");

      const existingProduct = await Products.findOne({ name });
      if (existingProduct) throw new Error("Product name already exists");

      await Products.create({
        name,
        description: description || "",
        price: parseFloat(price),
        stock: parseInt(stock),
        category
      });

      res.redirect('/products');
    } catch (error) {
      const categories = await Category.find();
      res.render("productCreate", { 
        categories, 
        error: error.message,
        formData: req.body 
      });
    }
  }

  static async editForm(req, res) {
    try {
      const product = await Products.findById(req.params.id).populate('category');
      const categories = await Category.find();
      if (!product) throw new Error("Product not found");
      
      res.render("productEdit", { 
        product,
        categories,
        formData: {},
        error: null});
    } catch (error) {
      res.redirect('/products');
    }
  }

  static async edit(req, res) {
    try {
      const productId = req.params.id;
      const { name, description, price, stock, category } = req.body;

      const product = await Products.findById(productId);
      if (!product) throw new Error("Product not found");

      if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) throw new Error("Invalid category");
      }

      if (name && name !== product.name) {
        const existingProduct = await Products.findOne({ name });
        if (existingProduct) throw new Error("Product name already exists");
      }

      product.name = name || product.name;
      product.description = description !== undefined ? description : product.description;
      product.price = price ? parseFloat(price) : product.price;
      product.stock = stock ? parseInt(stock) : product.stock;
      product.category = category || product.category;

      await product.save();
      res.redirect('/products');
    } catch (error) {
      const product = await Products.findById(req.params.id);
      const categories = await Category.find();
      res.render("productEdits", { 
        product, 
        categories, 
        error: error.message,
        formData: req.body 
      });
    }
  }
}

module.exports = ProductController;