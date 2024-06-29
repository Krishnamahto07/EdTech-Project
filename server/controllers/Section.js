const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection")
exports.createSection = async(req,res) =>{
    try {
        // Fetch data
        const {sectionName , courseId} = req.body;

        // Data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:"Missing Data",
            })
        }

        // create Section
        const newSection = await Section.create({sectionName});

        // update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new : true},
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec()
        // section ans subSection populate HW

        // response 
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails, 
        })
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Create Section",
        })
    }
}

// Update Section controller
exports.updateSection = async(req,res) =>{
    try {
        // Data fetch
        const {sectionName , sectionId , courseId} = req.body;
        // Data validate
        if( !sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"Incompete data",
            })
        }
        // update Data
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName
            },
            {new:true}
        );

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        // Response send
        return res.status(200).json({
            success:true,
            message:section,
            data:course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Update Section hi",
        })
    }
}


// Delete Section controller
/*
exports.deleteSection = async(req,res) =>{
    try {
        // Fetch Id
        const {sectionId} = req.params;

        // find and delete
        await Section.findByIdAndDelete(sectionId);
        

        // Todo do you need to delete section id from course schema
        
        // return response
        return res.status(200).json({
            success:true,
            message:"Deleted Section Successfull",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Delete Section",
        })
    }
}
    */
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   