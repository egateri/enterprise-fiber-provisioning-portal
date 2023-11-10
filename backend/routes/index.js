const User =require("../model/user");
const NE =require("../model/networkEquipment");
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

router.post("/add/pe",async(req,res)=>{
    const pe = req.body;
    try {
        const newPe = await PERouter.create(pe);
        res.status(201).json({
            "statusCode":201,
            "successMessage":"PE added successfully",
            "errorMessage":null,
            "data":null
    })
        
    } catch (error) {
        res.status(400).json({"error":error.name,"message":error.message})        
    }   
    }) 

    router.post("/add/ne",async(req,res)=>{
        const ne = req.body;
        console.log(ne)
        try {
            const newne = await NE.create(ne);
            res.status(201).json({
                "statusCode":201,
                "successMessage":"NE added successfully",
                "errorMessage":null,
                "data":null
        })
            
        } catch (error) {
            res.status(400).json({"error":error.name,"message":error.message})        
        }   
        })

module.exports =router;