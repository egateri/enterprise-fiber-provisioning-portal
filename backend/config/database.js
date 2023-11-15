const mongoose =require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const logger = require("./logger")

const options = {
    useNewUrlParser:true,
    family:4,
    useUnifiedTopology:true
};
mongoose.connect(MONGO_URI,options);

const db = mongoose.connection;
db.on("error", ()=>logger.info(`Database connection error {}`));
db.once("open",()=> {logger.info("Database Connected successfully")});

module.exports = db;