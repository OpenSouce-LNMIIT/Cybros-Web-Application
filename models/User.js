var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    username: {type:String, index:true,unique:true,default:null},
    Name: {type:String,default:null},
    Email: {type:String,default:null},
    Phone: {type:String,default:null},
    Password: {type:String,default:null},
    Age: {type:Number,default:null},
    Gender: {type:String,default:null},
    Address: {type:String,default:null},
    Institute_or_Company: {type:String,default:null},
    confirmed:{type:Boolean,default:false}
});

module.exports = mongoose.model("User",user);