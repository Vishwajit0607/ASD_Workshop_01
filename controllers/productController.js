const productService = require("../services/productService");

const {
    setCache
} = require("../middleware/cacheMiddleware");

async function getProducts(req, res) {
    try {
        const products = await productService.getProducts();

        setCache(req.originalUrl, products);

        res.json(products);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        setCache(req.originalUrl, product);

        res.json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getProducts,
    getProductById
};