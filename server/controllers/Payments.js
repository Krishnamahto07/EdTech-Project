const {instance} = require("../config/rajorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { useId } = require("react");
const { default: mongoose } = require("mongoose");
// const mongoose = require("mongoose")

// const { default: mongoose } = require("mongoose");
// const { default: mongoose } = require("mongoose");


// capture the payment and initate the Razorpay order

exports.capturePayment = async(req,res) =>{
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0)
        return res.json({success : false, message : "Please Provide Courses"});

    let totalAmount = 0;

    for(const course_id of courses){
        let course;

        try {
            // console.log("TYPE OF COURSE ID : ",typeof(course_id))

            course = Course.findById(course_id);
            if(!course)
                return res.status(200).json({success:false ,message:"Course Not Found"});
            
            // console.log("USER ID ",userId);
            // console.log("TYPE OF USER ID : ",typeof(userId))

            // const uid = new mongoose.Types.ObjectId(userId);
            const uid = new mongoose.Types.ObjectId(userId);

            // console.log(" UID ",uid);
            // console.log("TYPE OF UID : ",typeof(uid))

            
            if(course?.studentEnrolled?.includes(uid)){
                return res.status(200).json({success:false, message:"Student is already Enrolled"});

            }
            totalAmount += course.price;
        } catch (error) {
            console.log(error);
            return res.status(500).json({success:false,message:error.message});
        }
    }

    const options = {
        amount : totalAmount * 100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString(),
    }

    console.log("OPTIONS CREATED SUCCESSFULL ..........");

    try {

        console.log("PAYMENT INITIATED SUCCESSFULL ....")

        const paymentResponse = await instance.orders.create(options)

        res.json({
            success:true,
            message:paymentResponse,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false , message: "Could Not and Error in Initiate Order .."})
    }
}

// VERIFY THE PAYMENT 
exports.verifyPayment = async(req,res) =>{
    console.log("RAZORPAY BODY : ",req.body);
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses  ;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature
        || ! courses || !userId )  
        return res.status(200).json({success:false, message :"All Payment Details not found "})

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature ){
        await enrollStudents(courses,userId,res);
        return res.status(200).json({
            success:true,
            message:"Payment Varified Successfull"
        })
    }
    return res.status(200).json({success:false, message:"Payment Failed "});

}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(500)
        .json({ success: false, message: "Could not send email" })
    }
  }


const enrollStudents = async(courses , userId, res)=>{
    console.log("EnrolledStudents DATA : ", courses," AND  ",userId);
    if(!courses || !userId )
        return res.status(400).json({ success : false , message:"Courses or User Id Not found for EnrolledStudent"})

    try {
        for(const courseId of courses){
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:useId}},
                {new : true},
            )
            if(!enrolledCourse){
                return res.status(500).json({success:false , message:"Course Not Found !!!"});
            }
    
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {$push:{courses:courseId,}},
                {new:true},)
            
            console.log('ENROLLED STUDENT : ',enrolledStudent);
            if(! enrolledStudent) 
                return res.status(400).json({success:false, message:"Can't Find StudentEnrolled "});
    
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName} `,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} + ${enrolledStudent.lastName}`)
            )
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN ENOLL STUDENTS "
        })
    }
}





















// exports.capturePayment = async(req,res) =>{
//     // Fetch data
//     const {course_id} = req.body;
//     const userId = req.user.id;

//     // Validation
//     if(! course_id){
//         return res.json({
//             success:false,
//             message:"Please provide valid Course Id",
//         })
//     };
//     let course;
//     try {

//         // valid Course or not
//         course = await Course.findById(course_id);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"Could not find Course Details ."
//             })
//         }

//         // User Already pay the same course
//         const uid = new mongoose.Types.ObjectId(userId); // Error
//         if(course.studentEnrolled.includes(uid)){
//             return  res.json(200).json({
//                 success:false,
//                 message:"Student Already Registered ."
//             })
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:"Error in Capture Payment ."
//         })
//     }
//     // Order create 
//     const amount = course.price;
//     const currency = "INR";
    
//     const options = {
//         amount : amount*100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }
//     };
//     try {
//         // initiate the Payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse)

//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Could Not Initiate Order ."
//         })
//     }
// };

// // Veriry signature of Razorpay 
// exports.verifySignature = async(req,res) => {
//     const webhookSecret = "123456789";

//     const signature = req.headers["x-razorpay-signature"];
    
//     const shasum = crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try {
//             // Action fullfill

//             // Find Course and Enrolled in Course
//             const enrolledCourse = await Course.findOne(
//                 {_id:courseId},
//                 {$push:{studentEnrolled: userId}},
//                 {new : true},
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course Not Found ."
//                 })
//             }
//             console.log(enrolledCourse);

//             // find Student and update its Schema
//             const enrolledStudent = await User.findOne(
//                 {_id:userId},
//                 {$push:{courses:courseId}},
//                 {new : true},
//             )
//             console.log(enrolledStudent);

//             // Mail send for confirmation

//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation ",
//                 "Welcom , You Enrolled Successfull",
//             )
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Successfull Signature Verify Signature ."
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success:false,
//                 message:"Error in Verify Signature ."
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid Request ."
//         })
//     }
// };