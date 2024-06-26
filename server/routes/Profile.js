const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
} = require("../controllers/Profile")

//  Profile Routes
/**********************************************************/

// Delete User Account
router.delete("/deleteProfile",deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getAllUserDetails);

// Get Enrolled course
router.get("/getEnrolledCourse",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports = router