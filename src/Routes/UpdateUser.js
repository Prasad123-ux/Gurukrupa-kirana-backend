const express = require('express');
const upload = require("../Controllers/AddImages");
const { saveUserDataController } = require('../Controllers/UpdateProfileData');
const { CartAuthMiddleware } = require('../Middleware/CartAuthMiddleware');
const saveUserDataRoute = express.Router();

// Route to handle adding product data with file upload
saveUserDataRoute.put('/updateProfileData', upload.single('profileImage'), saveUserDataController);

module.exports = { saveUserDataRoute};
