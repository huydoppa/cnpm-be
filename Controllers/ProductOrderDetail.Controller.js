const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const ProductOrderDetail = require('../Models/ProductOrderDetail.model');
const ProductOrder = require('../Models/ProductOrder.model')
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');
const Product = require('../Models/Product.model');

module.exports = {
  createListOrderProductDetail: async (orderProductDetails) => {
    try {
      for (const orderProductDetail in orderProductDetails) {
        
       await ProductOrderDetail.create(orderProductDetail);
      }

      return "success";
    } catch (error) {
      return error;
    }
  },
};