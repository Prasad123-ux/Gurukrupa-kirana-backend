const { userRegister } = require('../Modules/UserData'); // Assuming your module is named userModel.js
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
const fs = require('fs');

// Configure Cloudinary (ensure you replace placeholders with actual keys)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Controller function to save or update user data
const saveUserDataController = async (req, res) => {
    console.log(req.body);
    try {
        const { name, mobile_number, address, role } = req.body;

        if (!name ) {
            return res.status(400).json({ message: 'Name and mobile number are required.' });
        }


        let imageUrl = '';

        // Check if an image file is uploaded
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user_profiles', // Folder name in Cloudinary
            });
            imageUrl = uploadResult.secure_url; // Get the secure URL of the uploaded image
        }

    const alreadyUser=await userRegister.findOne({mobile_number:req.mobile_number})
    if(alreadyUser){
        return res.status(400).json({message:"user already found with mobile number"})
    }

        // Check if a user with the given mobile number already exists
        let user = await userRegister.findOne({ mobile_number });

        if (user) {
            // Update existing user data
            user.name = name || user.name;
            user.address = address || user.address;
            user.role = role || user.role;

            if (imageUrl) {
                user.profileImage = imageUrl; // Update image URL if new image is uploaded
            }

            const updatedUser = await user.save();

            fs.unlink(req.file?.path, (err) => {
                if (err) {
                    console.error('Error removing local file:', err);
                } else {
                    console.log('Local file removed:', req.file?.path);
                }
            });

            return res.status(200).json({
                message: 'User data updated successfully.',
                user: updatedUser,
            });
        } else {
            // Create a new user record
            const newUser = new userRegister({
                name,
                mobile_number,
                address,
                role,
                profileImage: imageUrl, // Save the uploaded image URL
            });

            const savedUser = await newUser.save();

            fs.unlink(req.file?.path, (err) => {
                if (err) {
                    console.error('Error removing local file:', err);
                } else {
                    console.log('Local file removed:', req.file?.path);
                }
            });

            return res.status(201).json({
                message: 'User data saved successfully.',
                user: savedUser,
            });
        }
    } catch (error) {
        console.error('Error saving or updating user data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { saveUserDataController };
