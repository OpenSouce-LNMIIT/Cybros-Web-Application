var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var admin = new Schema({
    username: {type:String, index:true,unique:true,default:null},
    Password: {type:String,default:null},
    HasAccess: {type:Boolean,default:false}
});

module.exports = mongoose.model("Admin",admin);