var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var event = new Schema({
    Event_ID: {type:String,index:true,unique:true,default:null},    
    Event_Name: {type:String,default:null},
    Event_Type: {type:String,default:null},
    Event_Description: {type:String,default:null},
    Venue: {type:String,default:null},
    Date: {type:String,default:null},
    Time: {type:String,default:null},
    Fee: {type:String,default:null},
    Additional_Links: {type:String,default:null}
});

module.exports = mongoose.model("Event",event);
