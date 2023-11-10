const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {v4 : uuidv4} = require('uuid')
const express = require("express");
const verifyToken = require("../middleware/authentication");

const router = express.Router();

router.put("/update/:id",verifyToken,(req, res) => {
   
    const timestamp =Date.now();
    const requestId = uuidv4();
  
    
    console.log(req.params.id)

    User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          roles:req.body.roles,
          password: req.body.password,
        },
      },
      { upsert: true }
    )
  
      .then(() => {
        res.status(200).json({ 
            header:{
                requestId:requestId,
                status:200, 
                 message:"OK",
                 timestamp:timestamp
                },
                body:{success: true }});
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
            header:{
                requestId:requestId,
                status:40, 
                 message:"failed",
                 timestamp:timestamp
                }, body:{success: false} });
        
      });
  });
  

module.exports = router;