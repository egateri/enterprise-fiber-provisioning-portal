const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {v4 : uuidv4} = require('uuid')
const express = require("express");

const router = express.Router();

router.post("/register", async (req, res) => {
    const timestamp =Date.now();
    const requestId = uuidv4();
   try {
    const { first_name, last_name, email, password } = req.body;
   

    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({
         header:{
                requestId:requestId,
                status:400, 
                 message:"bad request",
                 timestamp:timestamp
                },
         body:{ message: "All inputs are required"}
         });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(409)
        .json({
            header:{
                requestId:requestId,
                status:409, 
                 message:"conflict",
                 timestamp:timestamp
                },
            body:{message: "User Already exists. Please Login"}  });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        first_name,
        last_name,
        email: email,
        roles:["USER"],
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: user._id, email,roles:user.roles },
        process.env.TOKEN_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      user.token = token;
      user.password = null;

      return res.status(201).json(
        {header:{
                requestId:requestId,
                status:201, 
                 message:"created",
                 timestamp:timestamp
                }, 
        body:{message: "success", 
             user: user} 
    });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(
        {header:{
                requestId:requestId,
                status:500, 
                 message:"error",
                 timestamp:timestamp
                }, 
        body:{message: "Internal Server error"} 
    })
  }
});
module.exports = router;