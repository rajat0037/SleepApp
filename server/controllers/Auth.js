const bcrypt = require("bcrypt");
const User = require("../models/User");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
// const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");

require("dotenv").config();

// signup
exports.signup = async (req,res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body

        if(
            !firstName ||
            !lastName || 
            !email ||
            !password || 
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).json({
                success : false,
                message : "All feilds are required",
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password and Confirm Password must be same",
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({
                success : false,
                message : "User already exits, please login to continue",
            })
        }

        // find the most recent otp
        const response = await Otp.find({email}).sort({createdAt : -1}).limit(1)
        console.log(response)

        if(response.length === 0){
            return res.status(400).json({
                success : false,
                message : "Otp is not valid",
            })
        } else if(otp !== response[0].otp){
            return res.status(400).json({
                success : false,
                message : "Otp is not valid",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // create additional profile for user
        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password : hashedPassword,
            accountType : accountType,
            additionalDetails : profileDetails._id,
        })

        return res.status(200).json({
            success : true,
            user,
            message : "User registered successfully",
        })
    } catch (error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "User cannot be registered, please try again",
        })
    }
}

// login
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : "Email and password are required",
            })
        }

        const user = await User.findOne({email}).populate("additionalDetails")

        if(!user){
            return res.status(401).json({
                success : false,
                message : "User is not register sign up first",
            })
        }


        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
                {email : user.email, id : user._id, additionalDetails : user.additionalDetails},
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            )

            // save token to user document in db
            user.token = token
            console.log("token", token);
            user.password = undefined

            // set cookies for token and return sucess response
            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : "user loggedin successfully",
            })
        } else{
            return res.status(401).json({
                success : false,
                message : "Password is incorrect",
            })
        }
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "fail to login",
        })
    }
}

// send otp for email Verification
exports.sendotp = async (req,res) => {
    try{
        const {email} = req.body

        const checkUserPresent = await User.findOne( {email })

        if(checkUserPresent){
            return res.status(401).json({
                success : false,
                message : "User already registered",
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
        })
        const result = await Otp.findOne({otp : otp})
        console.log("OTP", otp)
        console.log("Result", result)

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets : false,
            })
        }

        const otpPayLoad = {email, otp}
        const otpBody = await Otp.create(otpPayLoad)
        console.log("OTP Body", otpBody)
        res.status(200).json({
            success : true,
            message : "otp send successfully",
            otp,
        })
    } catch(error){
        console.log(error.message)
        return res.status(500).json({
            success : false,
            message : "fail to send otp",
        })
    }
}
