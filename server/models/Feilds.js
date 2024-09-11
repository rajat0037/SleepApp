const mongoose = require("mongoose");

const feildSchema = new mongoose.Schema({
    feildType : {
        type : String,
        require : true,
        enum : ['mood', 'energy', 'sleepQuality', 'other']
    },
    value : {
        type : String,
        require : true
    },
    sessionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Session',
        required : true,
    }
}, {
    timestamps : true, // automatically add createdAt and updatedAt feilds
});

module.exports = mongoose.model("Feilds", feildSchema);