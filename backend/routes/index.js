const User =require("../model/user");
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");
const express =require("express");
const router =express.Router();
const PERouter = require("../model/providerEdgeRouters");
const NE = require("../model/networkEquipment");

router.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to Fiber Provisioning portal"});
});

router.post("/add/pe",async(req,res)=>{
    const pe = req.body;
    try {
        const newPe = await PERouter.create(pe);
        res.status(201).json({
            "statusCode":201,
            "successMessage":"PE added successfully",
            "errorMessage":null,
            "data":newPe
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