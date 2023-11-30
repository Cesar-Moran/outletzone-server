const { Router } = require("express");
const addProduct =
  require("../controllers/product/product.controllers").addProduct;
const displayProducts =
  require("../controllers/product/product.controllers").displayProducts;
const displaySingleProduct =
  require("../controllers/product/product.controllers").displaySingleProduct;
const filterProductsByCategory =
  require("../controllers/product/product.filter.controllers").filterProductsByCategory;

const verifyProductQuantity =
  require("../controllers/product/product.controllers").verifyProductQuantity;

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get("/api/displayProducts", displayProducts);
router.get("/api/displaySingleProduct/:id", displaySingleProduct);
router.get("/api/verifyProductQuantity/:id", verifyProductQuantity);
router.get("/api/filterProductsByCategory/:category", filterProductsByCategory);
router.post("/api/addProduct", upload.single("product_image"), addProduct);

module.exports = router;
