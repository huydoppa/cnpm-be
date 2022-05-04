const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const Customer = require('../Models/ServiceOrder.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');

module.exports = {
    bookOrderService: async (req, res) => {
      try {
        let { orderServiceDetails, orderService } = req.body;
        if (!orderServiceDetails || !orderService)
          return res.json({ error: 1, message: "Invalid params" });
  
        let orderServiceCreated = await ServiceOrder.create(orderService);
  
        for (let orderServiceDetail of orderServiceDetails) {
          orderServiceDetail.idServiceOrder = orderServiceCreated.id;
        }
  
        let result = await ServiceOrderController.createListOrderServiceDetail(
          orderServiceDetails
        );
        if (result === "success")
          return res.json({ error: 0, message: "success" });
        else return res.json({ error: 500, message: "server error" });
      } catch (error) {
        return res.json({ error: 500, message: "server error" });
      }
    },
  };