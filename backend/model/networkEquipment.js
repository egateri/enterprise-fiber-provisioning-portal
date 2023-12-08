
const mongoose = require("mongoose");

const networkequipmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ip:{
        type:String, 
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    aggregatingPe:{
        type:String,
        required:true,
    },
    peIp:{
        peIp1:{
            type:String,
            required:true,
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
        required:true,
    },
    deviceType:{
        type:String,
        required:true
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

const NetworkEquipment = mongoose.model('networkequipment',networkequipmentSchema);

module.exports = NetworkEquipment;


