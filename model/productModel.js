const products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
};

const findByID = id => {
    return new Promise((resolve, reject) => {
        const singleProduct = products.find(product => product.id === id);
        resolve(singleProduct);
    });
};

const create = product => {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);
        writeDataToFile("./data/products.json", products);
        resolve(newProduct);
    });
};

const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex(product => product.id === id);
        products[index] = { id, ...product };
        writeDataToFile("./data/products.json", products);
        resolve(products[index]);
    });
};

const removeProduct = id => {
    return new Promise((resolve, reject) => {
        const newProductList = products.filter(product => product.id !== id);
        writeDataToFile("./data/products.json", newProductList);
        resolve();
    });
};

module.exports = {
    findAll,
    findByID,
    create,
    update,
    removeProduct
};