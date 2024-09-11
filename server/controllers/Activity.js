const Activity = require("../models/Activity");

// create new activity
exports.createActivity = async (req,res) =>{ 
    try{
        const {activityType, sessionId, metadata} = req.body;

        // validation
        if(!activityType || !sessionId || !metadata){
            return res.status(400).json({
                success : false,
                message : "All feilds are required",
            });
        }

        // create new activity
        const activity = new Activity({
            activityType,
            sessionId,
            metadata,
        });

        await activity.save();

        res.status(201).json({
            success : true,
            message : "Activity created successfully",
            data : activity,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while creating activity",
            error : error.message,
        });
    }
};

// get all activity for a specific session
exports.getAllActivitiesBySession = async (req,res) => {
    try{
        const {sessionId} = req.params;

        // fetch activities for a given session
        const activities = await Activity.find({sessionId});

        if(!activities.length) {
            return res.status(404).json({
                success : false,
                message : "No activities found for the given session",
            });
        }

        res.status(200).json({
            success : true,
            data : activities,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while fetching activities",
            error : error.message,
        });
    }
};

// update activity by id
exports.updateActivity = async (req,res) => {
    try{
        // _id is your activity id as it is unique identifier for the activity
        const {activityId} = req.params;
        const {activityType, metadata} = req.body;

        // find activity
        const activity = await Activity.findByIdAndUpdate(
            activityId,
            {activityType, metadata},
            {new : true}
        );

        if(!activity){
            return res.status(404).json({
                success : false,
                message : "Activity not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Activity created successfully",
            data : activity,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while updating session",
            error : error.message,
        });
    }
};

// delete an activity by id
exports.deleteActivity = async (req,res) => {
    try{
        const {activityId} = req.params;

        // find activity by id and delete
        const activity = await Activity.findByIdAndDelete(activityId);

        if(!activity){
            return res.status(404).json({
                success : false,
                message : "Activity not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Activity delete successfully",
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error while delete activity",
            error : error.message,
        });
    }
};