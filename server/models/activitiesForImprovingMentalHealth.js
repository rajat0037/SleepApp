const mongoose = require('mongoose');

// define the activity schema
const activitySchema = new mongoose.Schema({
    title :{
        type:String,
        required : true,
    },
    description:{
        type:String,
        required : true,
    },
    field:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'FieldsOfImproveMentalHealth',
        required : true,
    },
});

module.exports = mongoose.model('ActivitesToImproveMentalHealth', activitySchema);