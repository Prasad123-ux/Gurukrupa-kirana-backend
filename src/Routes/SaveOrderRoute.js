const express = require('express');
const { saveOrderController } = require('../Controllers/SaveMyOrder');
const saveMyOrderRouter = express.Router();

saveMyOrderRouter.post('/saveMyOrder', saveOrderController);

module.exports = {saveMyOrderRouter};
   

