const User = require("..//models/User")
const OTP = require("../models/Otp")
const Profile = require("../models/Profile")
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// send OTP 

exports.sendOTP = async(req,res) =>{
    try {
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Exists"
            })
        }

        // Genrate OTP
        // var otp = otpGenerator.generate(6,Number);
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        // chect for unique
        let result = await OTP.findOne({otp : otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            console.log("OTP = ",otp);
            result = await OTP.findOne({otp: otp})
        }

        const otpPayload = {email,otp};

        // create Entry in DB
        const otpBody = await OTP.create(otpPayload);
        // console.log(otpBody);

        // Response

        return res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in OTP Sent"
        })
    }

}


// signUp

exports.signUp = async(req,res) => {
    try {
        // Fetch data from request body
        const {
            email,
            firstName,
            lastName,
            password,
            confirmPassword,
            accountType,
            // contactNumber,
            otp
            } = req.body;

        // All types of validation

        if( !email || !firstName || !lastName 
            || !password || !confirmPassword || !otp ){
                return res.status(401).json({
                    success:false,
                    message:"Fill All The Details !"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password Doesn't Match !!!"
            })
        }
        
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(400).json({
                success:false,
                message:"User Already Exist !"
            })
        }

        // Find most resent OTP
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        // const recentOtp = await OTP.find({email});
        // console.log("recent otp : ",recentOtp);
        
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"OTP Doesn't Founded !"
            })
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP !"
            })
        }

        // Hash Password

        const hashedPassword = await bcrypt.hash(password,10);
        console.log("Hashed Password : ",hashedPassword);
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,            
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType:accountType,
            additionalDetails:profileDetails._id,
            images:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        // Response
        return res.status(200).json({
            success:true,
            message:"User is Registered Successfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in SingUp User !"
        })
    }
}

// login
exports.login = async (req,res) =>{
    try {
        // Fetch Data
        const {email,password} = req.body;

        // Validation

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill All Fields"
            })
        }

        // User check exist or not

        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user) {
            return res.status(400).json({
                success:false,
                message:"User Doesn't Exists plz Sign up first"
            })
        }

        // Genrate JWT and password matching

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET ,{
                expiresIn:"2h",
            })
            user.token = token;
            user.password = undefined;

            // Cookie genrate

            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }
        else {
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Login User !"
        })
    }

}


// change Password

exports.changePassword = async(req,res) =>{
    try {
        // fetch data
        const { email , oldPassword , newPassword , confirmPassword } = req.body;

        // Validation
        if(!email || !oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Fill All Details !"
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password Doesn't Match !!!"
            })
        }

        const user = await User.findOneAndUpdate({email},{password:newPassword})
        
        return res.status(200).json({
            success:true,
            user,
            message:"Password Update Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Change Password !"
        })
    }
}