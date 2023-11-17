
const mongoose = require("mongoose");

const perouterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    peIp1:{
        type:String,
        required:true,
    },
    peIp2:{
        type:String,
    },
    peInterface1:{
        type:String,
        required:true,
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
    },
    deleted:{
        type:Boolean,
        required:true,
        default:false
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

const PERouter = mongoose.model('perouter',perouterSchema);

module.exports = PERouter;
