const SourceOfStress = require("../models/SourceOfStress");

// create a new source of stress
exports.createSourceOfStress = async (req,res) => {
    try{
        const {userId, stressSourceType, serverity} = req.body;

        // validate 
        if(!userId || !stressSourceType){
            return res.status(400).json({
                success : false,
                message : "Please provide all required fields",
            });
        }

        // create new Stress source
        const sourceOfStress = new SourceOfStress({
            userId,
            stressSourceType,
            serverity,
        });

        await sourceOfStress.save();

        res.status(201).json({
            sucess : true,
            message : "Source of stress created successfully",
            data : sourceOfStress,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error creting stress source",
            error : error.message,
        });
    }
};

// get all stress source for user
exports.getAllSourceOfStress = async (req,res) => {
    try{
        const {userId} = req.params;

        const sourceOfStress = await SourceOfStress.find({userId});

        if(!sourceOfStress.length) {
            return res.status(404).json({
                success : false,
                message : "no stress source found for this user",
            });
        }

        res.status(200).json({
            success : true,
            data : sourceOfStress,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while fetching source of stress",
            error : error.message,
        });
    }
};

// update a existing source of stress
exports.updateSourceOfStress = async (req,res) => {
    try{
        // _id is the sourceOfStressId
        const {sourceOfStressId} = req.params;
        const {stressSourceType, serverity} = req.body;

        // find and update stress source
        const updateSourceOfStress = await SourceOfStress.findByIdAndUpdate(
            sourceOfStressId,
            {stressSourceType, serverity},
            {new : true}
        );

        if(!updateSourceOfStress){
            return res.status(404).json({
                success : false,
                message : "stress source not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "stress source updated successfully",
            data : updateSourceOfStress,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error while updating stress source",
            error : error.message,
        });
    }
};

// delete a stress source
exports.deleteSourceOfStress = async (req,res) => {
    try {
        const {sourceOfStressId} = req.params;

        const deleteSourceOfStress = await SourceOfStress.findByIdAndDelete(sourceOfStressId);

        if(!deleteSourceOfStress){
            return res.status(404).json({
                success : false,
                message : "source of stress not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "source of stress deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error while deleting the source of stress",
            error : error.message,
        });
    }
};