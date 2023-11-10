const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const verifyToken = (req, res, next) => {
  const timestamp = Date.now();
  const requestId = uuidv4();
  const token =req.body.token ||req.query.token ||req.headers["token"] ||req.header("token");

  if (!token) {
    return res
      .status(400)
      .json({
        header:{
            requestId:requestId,
            status:400, 
             message:"bad request",
             timestamp:timestamp
            },
            body:{ message: "A token is required for authentication" }});
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
        header:{
            requestId:requestId,
            status:401, 
             message:"unauthorized",
             timestamp:timestamp
            },
         body:{message: "Invalid Token"} });
  }
  return next();
};

module.exports = verifyToken;
