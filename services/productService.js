const {
    readProducts,
    writeProducts
} = require("../database/productDatabase");

async function getProducts() {
    return await readProducts();
}

async function getProductById(id) {
    const products = await readProducts();

    return products.find(product => product.id === id);
}

module.exports = {
    getProducts,
    getProductById
};