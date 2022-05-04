const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const Admin = require('../Models/Admin.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');

module.exports = {
    login: async(req, res ) =>{
        try{
            let {phone, password} = req.body;
            if(!phone || !password) return res.json({e:1 ,m:"Phone or password invalid"});
            let findAdmin = await Admin.findOne({phone});
        //    let checkPassword = await bcrypt.compareSync(password, findAdmin.password);
        let checkPassword = 1 ;
            if(!findAdmin || !checkPassword)
                return res.json({e:1, m:  "Phone or password invalid"});
            const Data={
                phone: phone,
            };
            let accessToken = await jwtHelper.generateToken(Data, accessTokenSecret, accessTokenLife);
            return res.status(200).json({e: 0, token:accessToken});
    }catch (error) {
        return res.status(500).json({ e: 1, m: error })
    }
},
};