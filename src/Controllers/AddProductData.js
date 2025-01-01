const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
const fs = require('fs');
const { ProductRegister } = require('../Modules/ProductData');
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addProductDataController = async (req, res) => {
    try {
        console.log('Received Body:', req.body); // Check the form data
        console.log('Received File:', req.file); // Check the uploaded file

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo.' });
        }

        // Extract form data
        const { productName, category, price, stock, unit, description, customUnit } = req.body;

        // Determine the final unit value
        const finalUnit = unit === 'other' ? customUnit : unit;

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'product_images' });

        // Remove the local file after uploading
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error removing local file:', err);
            } else {
                console.log('Local file removed:', req.file.path);
            }
        });

        // Prepare product data with the Cloudinary image URL
        const productData = new ProductRegister({
            productName,
            productCategory: category,
            productPrice: price,
            productStockQuantity: stock,
            productUnit: finalUnit,
            productDescription: description,
            productLink: [result.secure_url], // Store as an array
        });

        // Save product data to the database
        await productData.save();

        return res.status(200).json({ message: 'Product added successfully!', product: productData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error occurred while adding product data.', error: error.message });
    }
};

module.exports = { addProductDataController };
