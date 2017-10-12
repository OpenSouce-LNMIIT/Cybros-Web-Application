var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//User schema imported
var User = require("./User");
//Event schema imported
var Event = require("./Event");

var registration = new Schema({
    event: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Event',default:null}
      ],
    user: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User',default:null}
      ]
});

module.exports = mongoose.model("Registrations",registration);
