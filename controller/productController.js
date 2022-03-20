const Product = require("../model/productModel");
const { getPostData } = require("../utils");

// this function gets all product from the product.json file (this should be a database)
// @GET Method /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "appication/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

// this function gets all product from the product.json file (this should be a database)
// @GET Method /api/products/:id
const getSingleProduct = async (req, res, id) => {
  try {
    const singleProduct = await Product.findByID(id);
    if (singleProduct) {
      res.writeHead(200, { "Content-Type": "appication/json" });
      res.end(JSON.stringify(singleProduct));
    } else {
      res.writeHead(404, { "Content-Type": "appication/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    }
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findByID(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    } else {
      const body = await getPostData(req);
      const { name, description, price } = JSON.parse(body);

      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const singleProduct = await Product.findByID(id);
    if (singleProduct) {
      await Product.removeProduct(id);
      res.writeHead(200, { "Content-Type": "appication/json" });
      res.end(
        JSON.stringify({ message: `Product ${id} successfully removed.` })
      );
    } else {
      res.writeHead(404, { "Content-Type": "appication/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
