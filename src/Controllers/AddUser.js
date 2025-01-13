// Import necessary modules
const { userRegister } = require("../Modules/UserData");
const env = require("dotenv");
const jwt = require("jsonwebtoken");

env.config();

const addUserController = async (req, res) => {
  try {
    console.log("Received Body:", req.body);

    const { name, mobile_number } = req.body.userInfo;

    // Check if the user already exists
    const existingUser = await userRegister.find({ mobile_number }).exec();

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists with this mobile number" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { mobile_number, role: req.body.role },
      process.env.JWT_TOKEN,
      { expiresIn: "1y" }
    );

    // Create a new user object
    const userObject = new userRegister({
      mobile_number,
      name,
    });

    // Save the user object to the database
    await userObject.save();

  return res.status(200).json({
      status: true,
      message: "User data saved successfully",
      token,
    });
  } catch (err) {

 return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { addUserController };
