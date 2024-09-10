const Profile = require("../models/Profile")
const User = require("../models/User")
const mongoose = require("mongoose")

exports.updateProfile = async (req,res) => {
    try{
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
        } = req.body

        const id = req.user.id

        // find the profile by id
        const userDetails = await User.findById(id)
        const profile = await Profile.findById(userDetails.additionalDetails)

        const user = await User.findByIdAndUpdate(id,{
            firstName,
            lastName,
        })
        await user.save();

        // update the profile feild
        profile.dateOfBirth = dateOfBirth
        profile.about = about
        profile.contactNumber = contactNumber
        profile.gender = gender

        await profile.save()

        // save the update profile
        const updatedUserDetails = await User.findById(id)
                                                .populate("additionalDetails")
                                                .exec()
        
        return res.json({
            success : true,
            message : "Profile updated successfully",
            updatedUserDetails,
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            error : error.message,
        })
    }
}

