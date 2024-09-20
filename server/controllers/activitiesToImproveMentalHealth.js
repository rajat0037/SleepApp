const ActivitesToImproveMentalHealth = require("../models/activitiesForImprovingMentalHealth");
const FieldsOfImproveMentalHealth = require("../models/feildsToImproveMentalHealth");
const insertActivities = require("../utils/FunctionOfActivitiesToImproveMentalHealth").insertActivities;

// insert Activities based on the feild
exports.seedActivities = async(req,res) => {
    try{
        await insertActivities(); // call your insertActivities function here
        res.status(200).json({
            message : "activities seeded successfully",
        });
    } catch (error){
        res.status(500).json({
            message : error.message,
        });
    }
};

// create a new activities
exports.createActivity = async (req,res) => {
    try{
        const {title, description, fieldId} = req.body;

        const feild = await FieldsOfImproveMentalHealth.findById(fieldId);
        if(!feild) {
            return res.status(400).json({
                success : false,
                message : "field not found",
            });
        }

        const newActivity = new ActivitesToImproveMentalHealth({
            title,
            description,
            field : fieldId
        });
        await newActivity.save();

        res.status(201).json({
            newActivity,
        });

    } catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};
// Get activities by field
exports.getActivitiesByField = async (req, res) => {
    try {
        const { fieldId } = req.params;
        const activities = await ActivitesToImproveMentalHealth.find({ field: fieldId }).populate('field', 'name');

        if (activities.length === 0) {
            return res.status(404).json({ message: 'No activities found for this field' });
        }

        res.status(200).json({ activities });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an activity
exports.updateActivity = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        const updatedActivity = await ActivitesToImproveMentalHealth.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an activity
exports.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivity = await ActivitesToImproveMentalHealth.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};