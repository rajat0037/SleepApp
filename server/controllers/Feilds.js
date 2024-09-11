const Feilds = require("../models/Feilds");

// create a new feild
exports.createFeild = async (req, res) => {
    try{
        const {feildType, value, sessionId} = req.body;

        // validate input
        if(!feildType || !value || !sessionId) {
            return res.status(400).json({
                success : false,
                message : "missing required feilds"
            });
        }

        const feild = new Feilds({
            feildType,
            value,
            sessionId
        });

        await feild.save();

        res.status(201).json({
            success : true,
            message : "feild created successfully",
            data : "feild"
        })
    } catch(error){
        res.status(500).json({
            success : false,
            message : "error while creating feild",
            error : error.message,
        });
    }
};

// retrieve all feilds for a specific session
exports.getFeildsBySession = async (req,res) => {
    try{
        const {sessionId} = req.params;

        const feilds = await Feilds.find({ sessionId }).exec();

        if(!feilds.length){
            return res.status(404).json({
                success : false,
                message : "No feild found for the given session",
            });
        }

        res.status(200).json({
            success : true,
            data : feilds,
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error while fetching feild",
            error : error.message,
        });
    }
};

// update feild
exports.updateFeilds = async(req,res) => {
    try{
        // _id is my feildId
        const {feildId} = req.params;
        const {feildType, value} = req.body;

        // find and update the feild
        const feild = await Feilds.findByIdAndUpdate(
            feildId,
            {feildType, value}, 
            {new : true}
        );

        if(!feild){
            return res.status(404).json({
                success : false,
                message : "feild not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Feild updated successfully",
            dat : feild
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error updating feild",
            error : error.message
        });
    }
};

// delete a feild
exports.deleteFeild = async (req,res) => {
    try{
        const {feildId} = req.params;

        const feild = await Feilds.findByIdAndDelete(feildId);

        if(!feild){
            return res.status(404).json({
                success : false,
                message : "feild not found",
            });
        }
        res.status(200).json({
            success : true,
            message : "Feild deleted successfully",
        });
    } catch(error){
        res.status(500).json({
            success : false,
            message : "Error deleting feild",
            error : "error.message",
        });
    }
};