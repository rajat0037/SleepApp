const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp :{
        type : String,
        required : true,
    },
    createdAt:{
        type : Date,
        default : Date.now,
        expires : 60 * 5, // 5min
    },
});

// define a function to send otp
async function sendVerificationEmail (email, otp){

    // create a transporter to send mail
    // define the email option
    // send email

    try{
        const mailResponse = await mailSender(email, "Verification mail from sleep App", otp);
        console.log("Email sent successfully : ", mailResponse.response);
    } catch (error){
        console.log("error occur while sending mail", error);
        throw error;
    }
}

// pre middlerware
otpSchema.pre("save", async function (next){
    console.log("new document saved to database");

    // only send an email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const Otp = mongoose.model("otp", otpSchema);
module.exports = Otp;


