const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const Service = require('../Models/Service.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require("path");


module.exports = {
    addService: async (req, res) => {
      try{
         await Service.create({
             idService : req.body.idService,
             name: req.body.name,
             image: req.body.image,
             price: req.body.price,
             promoPrice: req.body.promoPrice,
             supplier: req.body.supplier,
             address: req.body.address,
             description: req.body.description,
         });
         return res.json({e:0})
      }catch(error){
          return res.status(500).json({e:1,m:'error'});
      }
  },
    editService: async (req,res) =>{
        try{
        let findService = await Service.findOne({idService: req.body.idService});
        if(findService) await (await Service.updateOne({idService: req.body.idService})).set({
            price: req.body.newprice,
            promoPrice: req.body.newpromoPrice,
            supplier: req.body.newsupplier,
            address: req.body.newaddress,
            description: req.body.newdescription,
        });
        return res.json({e:0})
        }catch(error){
           return res.status(500).json({e:1,m:'error'});
        }
    },
    deleteService: async (req,res) =>{
        try{
            await Service.deleteOne({idService:req.post.idService});
            return res.json({e:0});
        }
        catch(error){
            return res.status(500).json({e:1,m:'error'});
        }
    },
    getService: async(req,res)=>{
        //console.log(await Product.find({}));
        res.json({'data':await Service.find({})})
    }
    

};