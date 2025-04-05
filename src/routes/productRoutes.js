const express = require("express");
const ProductController = require("../controllers/productController");
const router = express.Router();


router.get("/", ProductController.index);
router.get("/create", ProductController.createForm);
router.post("/create", ProductController.create);
router.get("/edit/:id", ProductController.editForm);
router.post("/edit/:id", ProductController.edit);

module.exports = router;