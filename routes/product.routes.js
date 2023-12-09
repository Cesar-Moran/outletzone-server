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
const {
  filterProductsByGuarantee,
} = require("../controllers/product/product.filter.controllers");
const {
  deleteProduct,
  editProduct,
  getProductToEdit,
} = require("../controllers/product/product.controllers");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get("/api/displayProducts", displayProducts);
router.get("/api/displaySingleProduct/:id", displaySingleProduct);
router.get("/api/verifyProductQuantity/:id", verifyProductQuantity);
router.get("/api/filterProductsByCategory/:category", filterProductsByCategory);
router.get(
  "/api/filterProductsByGuarantee/:guarantee",
  filterProductsByGuarantee
);
router.delete("/api/deleteProduct/:id", deleteProduct);
router.post("/api/addProduct", upload.single("product_image"), addProduct);
router.put("/api/editProduct/:id", editProduct);
router.get("/api/getProductToEdit/:id", getProductToEdit);

module.exports = router;
