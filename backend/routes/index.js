const User =require("../model/user");
const NetworkEquipment =require("../model/networkEquipment");
const PERouter =require("../model/providerEdgeRouter")
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");
const express =require("express");
const {v4 : uuidv4} = require('uuid');
const router =express.Router();

router.get("/",(req,res)=>{
    const timestamp =Date.now();
    const requestId = uuidv4();
    res.status(200).json({
        header:{
            requestId:requestId,
            status:200, 
             message:"OK",
             timestamp:timestamp
            },
            body:{message:"Welcome to Fiber Provisioning portal API"}});
});
module.exports =router;