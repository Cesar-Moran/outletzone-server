const { Router } = require("express");
const addProduct = require("../controllers/product.controllers");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post("/api/addProduct", addProduct);

module.exports = router;
