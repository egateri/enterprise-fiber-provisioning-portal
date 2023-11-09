
const mongoose = require("mongoose");

const peSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    peIp1:{
        type:String,
        require:true
    },
    peIp2:{
        type:String,
        require:true
    },
    peInterface1:{
        type:String,
        require:true
    },
    peInterface2:{
        type:String,
    },
    peInterface3:{
        type:String,
    },
    deviceType:{
        type:String,
        required:true
    },
    mcLag:{
        type:Boolean,
        required:true,
        default:false
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        required:true,
        default:Date.now()
    }
});

const PERouter = mongoose.model('perouter',peSchema);

module.exports = PERouter;
