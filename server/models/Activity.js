const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    activityType : {
        type: String,
        required : true,
        enum : [
            "meditation", 
            "yoga", 
            "breathingExercise", 
            "sleepLog", 
            "wakeUpLog", 
            "mindfulness", 
            "gratitudeJournal", 
            "bodyScan", 
            "guidedRelaxation", 
            "progressiveMuscleRelaxation", 
            "soundTherapy", 
            "natureWalk", 
            "visualization", 
            "aromatherapy", 
            "readingBeforeSleep", 
            "stretching", 
            "hydrationTracker", 
            "dailyReflection", 
            "energyLevelCheck", 
            "positiveAffirmations", 
            "moodTracker", 
            "focusExercise", 
            "sleepQualityCheck"
        ]
    },
    timeStamp : {
        type : Date,
        default : Date.now,
    },
    sessionId : {
        type : String,
        ref : "Session",
        required : true,
    },

    //  The mongoose.Schema.Types.Mixed is built into Mongoose and is used for flexibility when you want to store unstructured or varying types of data.

    // example :
    
    // {
    //     "activityType": "yoga",
    //     "metadata": {
    //       "yogaType": "Hatha",
    //       "duration": 45  // Duration in minutes
    //     }
    //   }
      

    metadata : {
        type : mongoose.Schema.Types.Mixed,
        default : {},
    }

}, {
    timestamps : true
});

module.exports = mongoose.model("Activity", activitySchema);