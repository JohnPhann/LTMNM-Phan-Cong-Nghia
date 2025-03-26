const express = require("express");
const CategoryController = require("../controllers/categoryController.js");
const router = express.Router();

router.get("/", CategoryController.list);
router.get("/create", CategoryController.createForm);
router.post("/create", CategoryController.create);

module.exports = router;