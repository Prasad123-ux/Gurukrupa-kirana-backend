const { ProductRegister } = require("../Modules/ProductData");

const getProductDataController = (req, res) => {
  ProductRegister.find()
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        // If data is found
        res.status(200).json({
          status: true,
          message: "Data fetched successfully",
          data: data, // Include the fetched data
        });
      } else {
        // If no data is found
        res.status(404).json({
          status: false,
          message: "No data found",
        });
      }
    })
    .catch((err) => {
      // Handle internal server errors
      res.status(500).json({
        status: false,
        message: "Internal server error",
        error: err.message, // Include error details for debugging
      });
    });
};

module.exports = { getProductDataController };
