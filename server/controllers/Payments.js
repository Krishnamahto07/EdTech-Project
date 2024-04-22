const {instance} = require("../config/rajorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
// const { default: mongoose } = require("mongoose");


// capture the payment and initate the Razorpay order

exports.capturePayment = async(req,res) =>{
    // Fetch data
    const {course_id} = req.body;
    const userId = req.user.id;

    // Validation
    if(! course_id){
        return res.json({
            success:false,
            message:"Please provide valid Course Id",
        })
    };
    let course;
    try {

        // valid Course or not
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:"Could not find Course Details ."
            })
        }

        // User Already pay the same course
        const uid = new mongoose.Types.ObjectId(userId); // Error
        if(course.studentEnrolled.includes(uid)){
            return  res.json(200).json({
                success:false,
                message:"Student Already Registered ."
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in Capture Payment ."
        })
    }
    // Order create 
    const amount = course.price;
    const currency = "INR";
    
    const options = {
        amount : amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };
    try {
        // initiate the Payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse)

        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could Not Initiate Order ."
        })
    }
};

// Veriry signature of Razorpay 
exports.verifySignature = async(req,res) => {
    const webhookSecret = "123456789";

    const signature = req.headers["x-razorpay-signature"];
    
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            // Action fullfill

            // Find Course and Enrolled in Course
            const enrolledCourse = await Course.findOne(
                {_id:courseId},
                {$push:{studentEnrolled: userId}},
                {new : true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course Not Found ."
                })
            }
            console.log(enrolledCourse);

            // find Student and update its Schema
            const enrolledStudent = await User.findOne(
                {_id:userId},
                {$push:{courses:courseId}},
                {new : true},
            )
            console.log(enrolledStudent);

            // Mail send for confirmation

            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulation ",
                "Welcom , You Enrolled Successfull",
            )
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Successfull Signature Verify Signature ."
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error in Verify Signature ."
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid Request ."
        })
    }
};