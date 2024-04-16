const Profile = require("../models/Profile");
const User = require("../models/User")

// Update Profile i.e. profile bydefault create with null value
exports.updateProfile = async (req,res) => {
    try {
        // Get Data
        const {dateOfBirth="", about = "",contactNumber,gender} = req.body;
        // Get User Id
        const id = req.user.id;
        // Validation 
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"Incomplete Data Update Profile",
                // error:message.error
            })
        }

        // find Profile
        const userDetails = await User.findById(id);

        const prodileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(prodileId);

        // Update Profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfull" ,
            profileDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Update Profile",
            error:message.error
        })
    }
}

// Delete profile Handler
exports.deleteAccount = async(req,res) =>{
    try {
        // get Id
        const id = req.user.id;

        // validation 
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            })
        }

        // delete Profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // delete user 
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"Profile Deleted Successfull",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Delete Profile",
            error:message.error
        })
    }
}

// Get User Details
exports.getUserDetails = async(req,res) =>{
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"Profile Details Fetched Successfull",
            userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Get User Details",
            error:message.error
        })
    }
}