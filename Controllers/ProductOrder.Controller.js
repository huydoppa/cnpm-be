const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const ProductOrder = require('../Models/ProductOrder.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');

module.exports = {
    bookOrderProduct: async (req, res) => {
      try {
        let {address,totalPrice,status,idCustomer,name,phone,idProductOrder}= req.body
        console.log(req.body)
        ProductOrder.create({
          idProductOrder: idProductOrder,
          idCustomer: idCustomer,
          name: req.body.name,
          phone: phone,
          address: address,
          totalPrice: totalPrice,
        })
        return res.json({e:1});
      } catch (error) {
        return res.json({ error: 500, message: "server errorrr" });
      }
    },
    getOrderProductDetails: async(req,res) =>{
      try{
        Product = await ProductOrder.find({});
        console(Product);

      }catch(error)
      {
        return res.json({'e':'error'})
      }
    }
  };