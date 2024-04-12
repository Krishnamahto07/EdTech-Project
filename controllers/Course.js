const Course = require("../models/Course")
const Tag = require("../models/Tags")
const User = require("../models/User")
const {uploadImageCloudinary} = require("../utils/imageUploader")

// createCourse handler fn

exports.createCourse = async(req,res) =>{
    try {
        // Fetch data
        const {courseName , courseDescription 
        ,whatYouWillLearn, price , tag} = req.body;

        // Get Thumbnail
        const thumbnail = req.files.thumbnailImage;

        // Validation 
        if(!courseName || !courseDescription || !whatYouWillLearn 
        || !price || !tag){
            return res.status(400).json({
                success:false,
                message:"Fill All Fields"
            })
        }

        // check for Instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details : ",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor Not Found"
            })
        }

        // check for Tag validation
        const tagDetails = await Tag.findById(tag);

        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Tag Details Not Found"
            })
        }

        // Upload Image to Cloudinary

        const thumbnailImage = await uploadImageCloudinary(thumbnail,process.env.FOLDER_NAME);

        // Create Entry for new Course

        const newCourse = await Course.create(
            {
                courseName,
                courseDescription,
                instructor:instructorDetails._id,
                whatYouWillLearn:whatYouWillLearn,
                price,
                tag:tagDetails._id,
                thumbnail:thumbnailImage.secure_url,
            }
        )

        // Add the new course to User that is Instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new : true},
        );

        // update the Tag Schema
        /*await Tag.create(
            {
                name:tagDetails.name,
                desciption:tagDetails.desciption,
                course:newCourse._id
            }
        )
        */

        return res.status(200).json({
            success:true,
            message:"Course Created Successfull",
            data:newCourse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Courser Creation !!!"
        })
    }
}

// Get All courses

exports.showAllCourses = async(req,res) =>{
    try {
        const allCourses = await Course.find({},{
        }).populate("instructor").exec();
        // const allCourses = await Course.find({},{
        //     courseName:true,
        //     price:true,
        //     thumbnail:true,
        //     instructor:true,
        //     ratingAndReviews:true,
        //     studentEnrolled:true,
        // }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Get All Courses Data Successfully ",
            data:allCourses,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Get All Courses"
        })
    }
}