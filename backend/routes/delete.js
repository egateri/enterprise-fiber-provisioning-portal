const User = require("../model/user");
const {v4 : uuidv4} = require('uuid')
const express = require("express");
const verifyToken = require("../middleware/authentication");

const router = express.Router();

  
  router.delete("/delete/:id", verifyToken, async (req, res) => {
    const timestamp =Date.now();
    const requestId = uuidv4();
   
    await User.deleteOne({ _id: req.params.id })
      .then(() => {
       return res.status(200).json({header:{
            requestId:requestId,
            status:200, 
             message:"OK",
             timestamp:timestamp
            },body:{success: true } });
      })
  
      .catch((err) => {
        console.log(err);
       return res.status(400).json({
            header:{
                requestId:requestId,
                status:400, 
                 message:"failed",
                 timestamp:timestamp
                },body:{success: false}  
            });

      });
  });

module.exports = router;