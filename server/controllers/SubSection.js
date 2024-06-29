const SubSection = require("../models/SubSection");
const Section  = require("../models/Section");
// const {uploadImageCloudinary} = require('../utils/imageUploader');
const {uploadImageCloudinary} = require('../utils/imageUploader')

// Create SubSection 
exports.createSubSection = async(req,res) =>{
    try {
        // Fetch Data
        
        console.log("CREATING SubSection .....");
        // console.log("REQ BODY ..",req.body);
        // console.log("REQ FILES -> ",req.files.video);
        const {sectionId , title, description } = req.body;
        const video = await req.files.video;
        // console.log("req.files.vide",req?.files?.video);
        // validation
        
        if( !title ||  !description){
            console.log("TITLE = ",title,"DESCRIPTION = ",description)
            return res.status(400).json({
                success:false,
                message:"Incomplete Data, Title or Description is missing ",
            }) 
        }

        if(!sectionId  ){
            console.log("SECTION ID = ",sectionId)
            return res.status(400).json({
                success:false,
                message:"Incomplete Data, Section Id is missing ",
            })
        }
        // else if(!timeDuration){
        //     console.log("TIMEDURATION = ",timeDuration)
        //     return res.status(400).json({
        //         success:false,
        //         message:"Incomplete Data, TimeDuration is missing ",
        //     })
        // }
        else if(!video){
            console.log("VIDEO = ",video)
            return res.status(400).json({
                success:false,
                message:"Incomplete Data, Video  is missing ",
            })
        }
        // console.log("UPLOADING CLOUDINARY......")
        // upload video to cloudinary
        const uploadDetails = await uploadImageCloudinary(video , process.env.FOLDER_NAME);
        // console.log("UPLOAD DETAILS....",uploadDetails?.secure_url);
        if(!uploadDetails){
            return res.status(500).json({
                sucess:false,
                message:"cloudinary se response nhi aaya ",
            })
        }
        // console.log("UPLOADING CLOUDINARY SUCCESSFULLY ......")

        // create subsection
        // console.log("CREATING SUBSECTION ......")
        // console.log("DATA in CREATE SUBSECTION :",title,description,uploadDetails.secure_url);
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`,
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
        ).populate("subSection")
        console.log("UPDATING SECTION SECCESSFULL  ......")

        // HW : log update section populated data


        // return response
        return res.status(200).json({
            success:true,
            message:"created  subSection Successfull",
            data: updatedSection
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
// exports.updateSubSection = async(req,res) =>{
//     try {


//         // return response
//         return res.status(200).json({
//             success:true,
//             message:"created  subSection Successfull",
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Error in update subsection !",
//             error:message.error
//         })
//     }
// }
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
// Delete SubSection
/*exports.deleteSubSection = async(req,res) =>{
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
}*/

exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
