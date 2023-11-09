
const mongoose = require("mongoose");

const neSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    ip:{
        type:String, 
        require:true
    },
    model:{
        type:String,
        require:true
    },
    aggregatingPe:{
        type:String,
        require:true
    },
    peIp:{
        peIp1:{
            type:String,
            require:true
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
        require:true
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

});

const NetworkEquipment = mongoose.model('networequipment',neSchema);

module.exports = NetworkEquipment;


