const express = require("express");
const BookingController = require("../controllers/bookingController");
const router = express.Router();

router.get("/", BookingController.list);
router.get("/create", BookingController.createForm);
router.post("/create", BookingController.create);
router.get("/edit/:id", BookingController.editForm);
router.post("/edit/:id", BookingController.update);
router.post("/cancel/:id", BookingController.cancel);

module.exports = router;
