const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const {v4 : uuidv4} = require('uuid');
const router = express.Router();



router.post("/login", async (req, res) => {
    const timestamp = Date.now();
    const requestId = uuidv4();
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ 
        header:{
            requestId:requestId,
            status:400, 
             message:"bad request",
             timestamp:timestamp
            },
        body:{message: "All inputs are required" }
        
        });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        header:{
            requestId:requestId,
            status:404, 
             message:"not found",
             timestamp:timestamp
            },
         body:{message: "User does not exists" }});
    }

    await bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          const token = jwt.sign(
            { user_id: user._id, first_name: user.first_name, last_name: user.last_name, email,roles:user.roles},
            process.env.TOKEN_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );

          user.token = token;

          return res.status(200).json({
            header:{
                requestId:requestId,
                status:200, 
                 message:"OK",
                 timestamp:timestamp
                },
            body:{
            message: "success",
            user_id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            roles:user.roles,
            token: user.token,}
          });
        } else {
          return res.status(401).json({ 
            header:{
                requestId:requestId,
                status:401, 
                 message:"Unauthorized",
                 timestamp:timestamp
                },
                body:{message: "Invalid Credentials"}});
        }
      })
      .catch((err) => {
        return res.status(500).json({
            header:{
                requestId:requestId,
                status:500, 
                 message:"error",
                 timestamp:timestamp
                },
             body:{message: "internal server error" }});
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        header:{
            requestId:requestId,
            status:500, 
             message:"error",
             timestamp:timestamp
            },
         body:{message: "internal server error" }});
  }
});
module.exports = router;