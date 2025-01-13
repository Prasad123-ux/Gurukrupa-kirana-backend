const { ProductRegister } = require("../Modules/ProductData");

const getProductByIDController = (req, res) => {
  const { id } = req.params; // Extract the id from query parameters
 console.log(id)
  if (!id) {
    return res.status(400).json({
      status: false,
      message: "Product ID is required as a query parameter",
    });
  }

  ProductRegister.findById(id)
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          status: true,
          message: "Data found",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "We don't have information with the provided ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    });
};

module.exports = { getProductByIDController };
