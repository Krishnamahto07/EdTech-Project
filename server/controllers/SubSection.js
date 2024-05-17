const SubSection = require("../models/SubSection");
const Section  = require("../models/Section");
// const {uploadImageCloudinary} = require('../utils/imageUploader');
const {uploadImageCloudinary} = require('../utils/imageUploader')

// Create SubSection 
exports.createSubSection = async(req,res) =>{
    try {
        // Fetch Data
        
        console.log("CREATING SubSection .....");
        console.log(req.body);
        const {sectionId , title, description , timeDuration = '6:30',video } = req.body;
        console.log("VIDEO ...",video);
        // Fetch video / file
        // const video = req?.files?.video;
        // console.log("req.files.vide",req?.files?.video);
        // validation
        
        if( !title ||  !description){
            return res.status(400).json({
                success:false,
                message:"Incomplete Data, Title or Description is missing ",
            }) 
        }

        if(!sectionId  ){
            return res.status(400).json({
                success:false,
                message:"Incomplete Data, Section Id is missing ",
            })
        }
        else if(!timeDuration){
            return res.status(400).json({
                success:false,
                message:"Incomplete Data, TimeDuration is missing ",
            })
        }
        else if(!video){
            return res.status(400).json({
                success:false,
                message:"Incomplete Data, Video  is missing ",
            })
        }
        console.log("UPLOADING CLOUDINARY......")
        // upload video to cloudinary
        const uploadDetails = await uploadImageCloudinary(video , process.env.FOLDER_NAME);
        console.log(uploadDetails?.secure_url);
        if(!uploadDetails){
            return res.status(500).json({
                sucess:false,
                message:"cloudinary se response nhi aaya ",
            })
        }
        console.log("UPLOADING CLOUDINARY SUCCESSFULLY ......")

        // create subsection
        console.log("CREATING SUBSECTION ......")

        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration: timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        console.log("CREATING SUBSECTION SUCCESSFULL......")

        // update section with subsection id
        console.log("UPDATING SECTION   ......")

        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id
                }
            },
            {new : true}
        )
        console.log("UPDATING SECTION SECCESSFULL  ......")

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
            error:error.message
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
