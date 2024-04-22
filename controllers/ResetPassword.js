const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
// Reset Password Token
exports.resetPasswordToken = async(req,res) =>{
    try {
        // Fetch data 
        const email = req.body.email;
        
        // Validiton
        const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"Email is not Registered"
                })
            }
            // Genrate Token
            const token = crypto.randomUUID();

            // Update user by adding Token and Expration time
            const updateDetails = await User.findOneAndUpdate(
                {email:email},
                {
                    token:token,
                    resetPasswordExpires:Date.now() + 5*50*1000,
                },
                {new:true} // updated document response m aata h
            );  
            // create url 
            const url = `http://localhost:3000/update-password/${token}`;
            
            // send mail 
            await mailSender(
                email,
                "Password Reset Link",
                `Password Reset Link : ${url}`
            );

            // return response
            return res.status(200).json({
                success:true,
                message:"Password Reset Successfull",
                data:token
            })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Password Reset Token"
        })
    }
}
// Reset Password
exports.resetPassword = async(req,res) =>{
    try {
        // data fetch
        const {password,confirmPassword,token} = req.body;

        // validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password not match "
            })
        }
        // find
        const userDetails = await User.findOne({token:token});
        
        // console.log("Token = ",token);
        // if not user in DB
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token is Expires"
            })
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        
        // update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"Password Reset successfull"
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Password Reset"
        })
    }

}
