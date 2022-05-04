const createError = require('http-errors');
const mongoose = require('mongoose');
const debug = console.log.bind(console);
const Customer = require('../Models/Customer.model');
const jwtHelper = require('../helpers/jwt.helper');
const res = require('express/lib/response');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const bcrypt = require('bcrypt');
const { append } = require('express/lib/response');
const fs = require('fs');
const md5 = require('md5');
let formidable = require("formidable");

module.exports = {
    login: async(req, res ) =>{
        try{
            let phone = req.body.phone;
            let password = req.body.password;
            if(!phone || !password) return res.json({e:1 ,m:"Phone or password invalid"});
            let findCustomer = await Customer.findOne({phone});
            let checkPassword = await bcrypt.compare(password, findCustomer.password);
       // let checkPassword = 1 ;
            if(!findCustomer || !checkPassword)
                return res.json({e:1, m:  "Phone or password invalid."});
            const Data={
                phone: phone,
                idCustomer: findCustomer.idCustomer,
            };
            let accessToken = await jwtHelper.generateToken(Data, accessTokenSecret, accessTokenLife);
            return res.status(200).json({e: 0, data: findCustomer});
    }catch (error) {
        return res.status(500).json({ e: 1, m: error })
    }
},
    changeProfile: async (req,res) =>{
        try{
            await Customer.updateMany({idCustomer: req.body.idCustomer}).set({...req.body});
            return res.json({e:0});
        }catch(error){
            return res.json({e: 1, m: error});
        }
    },
    changePassword: async(req,res) =>{
        try{
            let findCustomer = await Customer.findOne({phone: req.body.phone});
            if(!findCustomer)  return res.json({e:1, m:'error'});
            let checkPassword = await bcrypt.compareSync(req.body.password, findCustomer.password);
            console.log(checkPassword)
            if(checkPassword){
                let newPassword = await bcrypt.hash(req.body.newPassword,10);
                console.log(newPassword)
                await Customer.updateOne({phone: req.body.phone},{ $set: {password: newPassword}});
                return res.json({e:0});
            }
            else return res.json({e:1 , m:'error'});
            }
            catch(error){
                return res.json({e:1,m:error})
            }
        },
    register: async(req,res)=>{
        try{
        let findCustomer = await Customer.findOne({phone: req.body.phone});
        if(findCustomer) return res.json({e:1, m:'tai khoan da ton tai'});
        let newPassword = await bcrypt.hash(req.body.password,10);
        await Customer.create({
            phone: req.body.phone,
            password: newPassword,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
        });
        return res.json({e:0});
    }
    catch(error){
        res.status(500).json({e:1,m:error});
        console.log(error);
    }
},
    
};