const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")

// auth for check Authentication
exports.auth = async(req,res,next) =>{
    try {
        // extract token
        const token = req.cookies.token 
        || req.body.token
        || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing"
            })
        }
        try {
            const decode =  jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in Validating token"
        })
    }
}


// is Student
exports.isStudent = async(req,res,next) =>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Students Only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role not Valid"
        })
    }
}

// is Instructor

exports.isInstructor = async(req,res,next) =>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Instructor Only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role not Valid"
        })
    }
}

// is Admin

exports.isAdmin = async(req,res,next) =>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This is protected route for Admin Only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role not Valid"
        })
    }
}