const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Route to get all products
router.get('/products', productController.getAllProducts);

//Route to search products by ID
router.get('/products/:itemName', productController.getProductsByName);

//Routes to edit a product
router.put("/products", productController.updateProduct);

//Routes to create a product
router.post("/products", productController.createProduct);

//Route to delete a product
router.delete("/products", productController.deleteProduct);

module.exports = router;