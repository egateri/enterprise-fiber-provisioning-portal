const mongoose = require('mongoose');

const userSchema ={
    first_name:{type:String, default:null, required :true},
    last_name:{type:String, default:null, required :true},
    email:{type:String, unique:true, required :true},
    password:{type:String,required :true},
    token:{type:String},
    createdAt:{
        type:mongoose.Schema.Types.Date,
        required:true,
        default:Date.now()
    }
    
};

module.exports = mongoose.model('User', userSchema)