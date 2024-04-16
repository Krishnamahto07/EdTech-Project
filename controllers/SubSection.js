const SubSection = require("../models/SubSection");
const Section  = require("../models/Section");
const {uploadImageCloudinary} = require('../utils/imageUploader');

// Create SubSection 
exports.createSubSection = async(req,res) =>{
    try {
        // Fetch Data
        const {sectionId , title, timeDuration,  description } = req.body;

        // Fetch video / file
        const video = req.files.videoFile;
        // validation
        if(! sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"Incomplete Data of updated Section ",
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
        // create subsection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // update section with subsection id
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id
                }
            },
            {new : true}
        )
        // HW : log update section populated data


        // return response
        return res.status(200).json({
            success:true,
            message:"created  subSection Successfull",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Creating subsection !",
            error:message.error
        })
    }
}

// update SubSection 
exports.updateSubSection = async(req,res) =>{
    try {



        // return response
        return res.status(200).json({
            success:true,
            message:"created  subSection Successfull",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in update subsection !",
            error:message.error
        })
    }
}
// Delete SubSection
exports.deleteSubSection = async(req,res) =>{
    try {


        // return response
        return res.status(200).json({
            success:true,
            message:"created  subSection Successfull",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Delete subsection !",
            error:message.error
        })
    }
}
