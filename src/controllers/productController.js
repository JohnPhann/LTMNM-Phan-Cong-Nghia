const categories = [
  { id: 1, name: "Điện thoại" },
  { id: 2, name: "Laptop" },
  { id: 3, name: "Phụ kiện" }
];

const products = [
  { id: 101, name: "iPhone 15 Pro", description: "Chip A17", price: 29990000, stock: 50, category_id: 1 },
  { id: 102, name: "MacBook Pro 16-inch", description: "Chip M2 Pro", price: 55990000, stock: 20, category_id: 2 },
  { id: 103, name: "AirPods Pro 2", description: "Chống ồn", price: 5990000, stock: 100, category_id: 3 },
  { id: 104, name: "Samsung Galaxy S23", description: "Snapdragon 8 Gen 2", price: 25990000, stock: 30, category_id: 1 },
  { id: 105, name: "Dell XPS 15", description: "Core i7, 32GB RAM", price: 43990000, stock: 15, category_id: 2 }
];

class ProductController {
  static index(req, res) {
    const categoryId = req.query.category_id ? parseInt(req.query.category_id) : null;
    const filteredProducts = categoryId ? products.filter(p => p.category_id === categoryId) : products;

    res.render("product", { 
      categories, 
      products: filteredProducts,
      selectedCategory: categoryId || "" // ✅ Đảm bảo biến `selectedCategory` luôn tồn tại
    });
  }
}

module.exports = ProductController;
