var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    username: {type:String,default:null},
    Email: {type:String,default:null},
    Password: {type:String,default:null},
    Repassword :{type:String,default:null}

});

module.exports = mongoose.model("User",user);