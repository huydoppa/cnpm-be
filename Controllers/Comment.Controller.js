const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const Comment = require('../Models/Comment.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');

module.exports = {
    addComment: async (req, res) => {
      try {
        let { content, idCustomer, idObject } = req.body;
        await Comment.create({ idObject, idCustomer,content });
        return res.json({ error: 0, message: "success" });
      } catch (error) {
        return res.json({ error: 500, message: "server error" });
      }
    },
    getComment: async (req,res) => {
        try{
            res.json({'data':await Comment.find({})})
        }
        catch(error){
            res.json({m:error});
        }
    }
  };