const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            trim : true,
        },
        lastName : {
            type: String,
            required : true,
            trim : true,
        },
        email : {
            type: String,
            required : true,
            trim : true,
        },
        password: {
            type: String,
            require : true,
            trim : true,
        },
        accountType : {
            type : String,
            enum : ["Admin", "User"],
            required : true,
        },
        additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
        token : {
            type : String,
        },
    },
);

module.exports = mongoose.model("user", userSchema);