const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

exports.createRating = async(req,res) =>{
    try {
        // Fetch data 
        const userId = req.user.id;
        const {rating , review , courseId} = req.body;

        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentEnrolled:{
                    $elemMatch: {$eq:userId}
                },
            }
        );

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Student is not Enrolled in the course"
            })
        }

        // Check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId,
            }
        );
        if(alreadyReviewed){
            return  res.status(403).json({
                success:false,
                message:"User already Reviewed the Couser"
            })
        }
        // create Rating and Review
        const ratingReview =await RatingAndReview.create(
            {
                rating,review,
                course:courseId,
                user: userId,
            }
        );

        // Update Course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id : courseId},
            {
                $push: { 
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true}
        );

        // return response
        console.log(updatedCourseDetails);
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully ",
            ratingReview,
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Create Ratings"
        })
    }
}

// Get average Rating
exports.getAverageRating = async(req,res) =>{
    try {
        // fetch couse Id
        const courseId = req.body.courseId;

        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    // Error in courseId
                    course: new mongoose.Types.ObjectId({courseId}),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg : "$rating"}
                    
                }
            }
        ])
        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
        // if no rating exist
        return res.status(200).json({
            success:true,
            message:"Average rating 0 , no rating given till now",
            averageRating:0,
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Get Average Ratings"
        })
    }
}

// Get all Ratings and Reviews

exports.getAllRating = async(req,res) =>{
    try {
        const allReviews = await RatingAndReview.find({})
                                .sort({rating : "desc"})
                                .populate({
                                    path:"User",
                                    select:"firstName lastName email image"
                                }).populate({
                                    path:"Course",
                                    select:"courseName",
                                }).exec();
    return res.status(200).json({
        success:true,
        message:"All reviews fetched successfully",
        data:allReviews,
    });
                    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Get All Ratings"
        })
    }
}