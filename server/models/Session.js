const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    sessionType: {
        type: String,
        enum : ["improveMentalHealth", "increaseFocus", "sleepBetter", "feelHappier"],
        required : true,
    },
    duration:{
        type : Number,
        required : true,
    },
    completed : {
        type: Boolean,
        default : false,
    },
    createdAt :{
        type : Date,
        default : Date.now(),
    }
});

module.exports = mongoose.model("Session", sessionSchema);
