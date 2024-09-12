const mongoose = require('mongoose');

const sourceOfStress = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true,
    },
    stressSourceType : {
        type : String,
        enum : ['work', 'financial', 'relationships', 'health', 'time management', 'life changes', 'academic', 'uncertainty', 'social media', 'parenting'],
        required : true,
    },
    serverity : {
        type : Number,
        required : true,
        min : 1,
        max : 10,
    },
    timestamp : {
        type : Date,
        default : Date.now,
    }
});
module.exports = mongoose.model('SourceOfStress', sourceOfStress);