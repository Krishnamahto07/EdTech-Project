const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        otp:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:20*60,
        }
    }
)
// a function that will send Emails

async function sendVerificationEmail(email, otp){
    try {
        console.log(otp)
        const mailResponse = await mailSender(email," Varification Email from StudyNotion ",otp);
        console.log("Email send Successfully", mailResponse);
    } catch (error) {
        console.log("Error in Sending Email",error);   
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports = mongoose.model("OTP",otpSchema)