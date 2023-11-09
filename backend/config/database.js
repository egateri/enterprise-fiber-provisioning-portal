const mongoose =require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const options = {
    family:4,
    useUnifiedTopology:true
};
mongoose.connect(MONGO_URI,options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open",()=> {console.log("Connected successfully");});

module.exports = db;