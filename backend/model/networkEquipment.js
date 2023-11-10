
const mongoose = require("mongoose");

const neSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ip:{
        type:String, 
        required:true
    },
    model:{
        type:String,
        required:true
    },
    aggregatingPe:{
        type:String,
        required:true
    },
    peIp:{
        peIp1:{
            type:String,
            required:true
        },
        peIp2:{
            type:String,
        }
    },   
    carrierVlan:{
        internet: {
            type: Number,
            required: true
        },
        mpls: {
            type: Number,
            required: true
        }
    },
    peInterface:{
        type:String,
        required:true
    },
    deviceType:{
        type:String,
        required:true
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        required:true,
        default:Date.now()
    }

})
module.exports = mongoose.model('NetworkEquipment', neSchema)




