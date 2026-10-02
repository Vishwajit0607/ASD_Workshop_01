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

async function createProduct(product) {
    const products = await readProducts();

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        ...product
    };

    products.push(newProduct);

    await writeProducts(products);

    return newProduct;
}

async function updateProduct(id, product) {
    const products = await readProducts();

    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    const updatedProduct = {
        id: id,
        ...product
    };

    products[index] = updatedProduct;

    await writeProducts(products);

    return updatedProduct;
}

async function patchProduct(id, product) {
    const products = await readProducts();

    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    const updatedProduct = {
        ...products[index],
        ...product,
        id: id
    };

    products[index] = updatedProduct;

    await writeProducts(products);

    return updatedProduct;
}

async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeProducts(products);

    return deletedProduct;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};