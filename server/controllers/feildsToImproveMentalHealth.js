const FieldsOfImproveMentalHealth = require('../models/feildsToImproveMentalHealth');

// Create a new field
exports.createFieldToImproveMentalHealth = async (req, res) => {
    try {
        const { name } = req.body;

        // Create and save the new field directly, Mongoose will handle enum validation
        const newField = new FieldsOfImproveMentalHealth({ name });
        
        // Check if the field already exists in the database
        const fieldExists = await FieldsOfImproveMentalHealth.findOne({ name });
        if (fieldExists) {
            return res.status(400).json({
                message: "Field already exists"
            });
        }

        // Save the new field
        await newField.save();

        res.status(201).json({
            message: "Field created successfully",
            field: newField
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// get all fields
exports.getAllFieldsToImproveMentalHealth = async (req,res) => {
    try{
        const fields = await FieldsOfImproveMentalHealth.find();
        res.status(200).json({
            fields
        })
    } catch (error) {
        res.status(500).json({
            message : error.message,
        });
    }
};

// get a specific feilds by id
exports.getFieldByIdToImproveMentalHealth = async (req, res) => {
    try {
        const field = await FieldsOfImproveMentalHealth.findById(req.params.id);
        if (!field) {
            return res.status(404).json({  
                message: "Field not found"
            });
        }
        res.status(200).json({  
            field,
        });
    } catch (error) {
        res.status(500).json({  
            message: error.message,
        });
    }
};


// chal nahi raha bkl, bad mei dekh lena isko 

// Update an existing field
// exports.updateFieldToImproveMentalHealth = async (req, res) => {
//     try {
//         const { name } = req.body;

//         // Directly update the field without checking for existing names
//         const field = await FieldsOfImproveMentalHealth.findByIdAndUpdate(req.params.id, { name }, { new: true });

//         if (!field) {
//             return res.status(404).json({
//                 message: 'Field not found',
//             });
//         }

//         res.status(200).json({
//             message: "Field updated successfully",
//             field
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };


// delete a field
exports.deleteFieldToImproveMentalHealth = async (req,res) => {
    try{
        const field = await FieldsOfImproveMentalHealth.findByIdAndDelete(req.params.id);
        if(!field){
            return res.status(404).josn({
                message : 'Field not found',
            });
        }
        res.status(200).json({
            message : "Field deleted successfully",
        });
    } catch(error) {
        res.status(500).josn({
            message : error.message,
        })
    }
}