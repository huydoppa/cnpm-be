const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const Cart = require('../Models/Cart.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');

module.exports = {
    addToCart: async (req, res) => {
      try {
        amount =1 ;
        let { idCustomer, idProduct } = req.body;
      //  let timkiem = await Cart.findOne({"idCustomer":idCustomer,"idProduct":idProduct})
      //  console.log(timkiem);
        await Cart.create({ idCustomer, idProduct,amount });
        return res.json({ error: 0, message: "success" });
      } catch (error) {
        return res.json({ error: 500, message: "server error" });
      }
    },

    getCart: async(req,res) => {
      try{
        res.json({'data':await Cart.find({})})
      } catch(error){
        return res.json({ error: 500, message: "server error" });
      }
    },
    deleteCart: async(req,res) => {
      try{
      let idProduct = req.query.id;
      await Cart.deleteOne({"idProduct":idProduct});
      }catch(error){
        return res.json({ error: 500, message: "server error" });
      }
    }
  };