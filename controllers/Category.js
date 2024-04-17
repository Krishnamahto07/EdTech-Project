const Category = require("../models/Category");
const Tag = require("../models/Category")

// Create Tag ka handler functions

exports.createCategory = async(req,res) =>{
    try {
        const {name , description} = req.body;

        if(!name , !description){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"Fill All Fields",
            }) 
        }

        // Create entry in DB

        const tagDetails = await Tag.create(
            {
                name:name,
                desciption:description,
            }
        );
        console.log(tagDetails);
        
        return res.status(200).json({
            success:true,
            message:"Created Tag Successfully",
        }) 
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Create Tag",
        })   
    }
}

// GetAll Tags 

exports.showAllCategories = async(req,res) =>{
    try {
        const allTags = await Tag.find({},{
            name:true,desciption:true
        });
        console.log(allTags);
        return res.status(200).json({
            success:true,
            message:"Get All Tag Successfull",
        })  
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Create Tag",
        })  
    }
}

// Category PageDetails
exports.categoryPageDetails = async(req,res) =>{
    try {
        // get categoryId
        const {categoryId} = req.body;
        // Get courses for specified category
        const selectedCategory = await Category.findById(categoryId)
        .populate("courses")
        .exec();
        // Validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Course Not Available"
            })
        }

        // get Courses for diffent categories
        const differentCategories = await Category.find(
            {
                _id:{$ne: categoryId},
            }
        ).populate("course")
        .exec();
        // Get top selling courses

        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Category Page Details"
        })
    }
}