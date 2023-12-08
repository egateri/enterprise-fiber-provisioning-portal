const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {v4 : uuidv4} = require('uuid')
const express = require("express");
const verifyToken = require("../middleware/authentication");

const router = express.Router();

router.put("/update/:id",verifyToken,async(req, res) => {
   
    const timestamp =Date.now();
    const requestId = uuidv4();
  
   
    const { first_name, last_name, password } = req.body;

    if (!(first_name && last_name && password)) {
      return res.status(400).json({
         header:{
                requestId:requestId,
                status:400, 
                 message:"bad request",
                 timestamp:timestamp
                },
         body:{ message: "Missing inputs"}
         });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          first_name: first_name,
          last_name: last_name,
          password:  encryptedPassword,
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