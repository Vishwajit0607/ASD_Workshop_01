const express = require("express");

const router = express.Router();

const {
    getProducts,
    getProductById
} = require("../controllers/productController");

const {
    cacheMiddleware
} = require("../middleware/cacheMiddleware");

router.get("/products", cacheMiddleware, getProducts);

router.get("/products/:id", cacheMiddleware, getProductById);

module.exports = router;