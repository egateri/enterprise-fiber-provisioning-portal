const User =require("../model/user");
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");
const express =require("express");
const router =express.Router();

router.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to Fiber Provisioning portal"});
});
module.exports =router;