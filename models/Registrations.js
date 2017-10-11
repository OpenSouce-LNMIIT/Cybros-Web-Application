var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var registration = new Schema({
    Registration_ID: {type:Number,default:null},
    Event_ID: [
        {type: Schema.Types.Event_ID, ref: 'Event',default:null}
      ],
    username: [
        {type: Schema.Types.username, ref: 'User',default:null}
      ]
});

module.exports = mongoose.model("Registrations",registration);
