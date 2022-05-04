const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const Product = require('../Models/Product.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require("path");
const { request } = require('http');


module.exports = {
    addProduct: async (req, res) => {
      try{
         if(!req.body.name||!req.body.image||!req.body.price||!req.body.type) return res.status(500).json({e:1,m:'thieu tham so'})
         await Product.create({
             idProduct: req.body.idProduct,
             name: req.body.name,
             price: req.body.price,
             promoPrice: req.body.promoPrice,
             type: req.body.type,
             description: req.body.description,
             image: req.body.image
         });
         return res.json({e:0})
      }catch(error){
          console.log(error)
          return res.status(500).json({e:1,m:'error'});
      }
  },
    
    editProduct: async (req,res) =>{
        try{
        let findProduct = await Product.findOne({idProduct: req.body.idProduct});
        if(findProduct) await (await Product.updateOne({idProduct: req.body.idProduct})).set({
            price: req.body.newprice,
            promoPrice: req.body.newpromoPrice,
            supplier: req.body.newsupplier,
            type: req.body.newtype,
            description: req.body.newdescription,
        });
        return res.json({e:0})
        }catch(error){
           return res.status(500).json({e:1,m:'error'});
        }
    },
    deleteProduct: async (req,res) =>{
        try{
            await Product.deleteOne({idProduct:req.post.idProduct});
            return res.json({e:0});
        }
        catch(error){
            return res.status(500).json({e:1,m:'error'});
        }
    },
    searchProduct: async (req,res)=>{
        try{
            let name = request.params.name;
            if(Product.find(name)){
                return res.json({a:Product.find(name)});
            }
        }catch(error){
            return res.status(500).json({e:1,m:'error'});
        }
    }, 
    getProduct: async(req,res)=>{
        //console.log(await Product.find({}));
        res.json({'data':await Product.find({})})
    }

};