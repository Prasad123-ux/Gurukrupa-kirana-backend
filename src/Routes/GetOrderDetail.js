const express= require('express')
const { getOrderDetail } = require('../Controllers/GetOrderDetail')
const getOrderDetailRoute= express.Router() 




getOrderDetailRoute.get("/getOrderDetail/:innerID", getOrderDetail) 

module.exports={getOrderDetailRoute}