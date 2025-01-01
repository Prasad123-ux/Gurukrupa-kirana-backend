const express = require('express');
const { addProductDataController } = require('../Controllers/AddProductData');
// const { upload } = require('../Controllers/AddProductData');
const upload = require("../Controllers/AddImages")
const addProductDataRoute = express.Router();

// Route to handle adding product data with file upload
addProductDataRoute.post('/addProductData', upload.single('photo'), addProductDataController);

module.exports = { addProductDataRoute };
