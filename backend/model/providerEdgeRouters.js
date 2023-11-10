
const mongoose = require("mongoose");

const peSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    model:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    peIp1:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    peIp2:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    peInterface1:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    peInterface2:{
        type:mongoose.Schema.Types.String,
    },
    peInterface3:{
        type:mongoose.Schema.Types.String,
    },
    deviceType:{
        type:mongoose.Schema.Types.String,
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
})
module.exports = mongoose.model('PERouter', peSchema)
