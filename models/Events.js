var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var event = new Schema({
    Event_ID: {type:Number,default:null},
    Event_Name: {type:String,default:null},
    Venue: {type:String,default:null},
    Date: {type:Date,default:null},
    Fee: {type:Number,default:null},
    Additional_Links: {type:String,default:null},
});

module.exports = mongoose.model("Events",event);
