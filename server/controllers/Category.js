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
        // console.log("Finding all Categories")
        
        const allTags = await Tag.find({},{
            name:true,desciption:true
        });
        // console.log(allTags);
        console.log('SUCCESSFULLY CALLED SHOWALLCATEGORIES .....')
        return res.status(200).json({
            success:true,
            message:"Get All Categories Successfull",
            data:allTags
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
        console.log('CALLING CATEGORYPAGEDETAILS....')
        const {categoryId} = req.body;
        console.log("CATEGORY ID : ",categoryId)
        // Get courses for specified category
        // const selectedCategory = await Category.findById(categoryId)
        // .populate("courses")
        // .exec();
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path:"courses",
            match: { status :"Published"},
            populate:"ratingAndReviews",
        }).exec()

        // console.log('SELECTED COURSE',selectedCategory)
        // Validation
        if(!selectedCategory){
            console.log('Category not found')
            return res.status(404).json({
                success:false,
                message:"Course Not Available"
            })
        }
        if(selectedCategory.courses.length === 0){
            console.log("No courses found for the selecte Category ..");
            return res.status(404).json({
                success:false,
                message:"No courses found for selected category",
            })
        }
        // console.log("M yaha ho ...")
        // Get Courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id:{ $ne : categoryId},
        })
        // console.log("CATEGORIES EXCEPT SELECTED -> ",categoriesExceptSelected);


        // let differentCategory = await Category.findOne(
        //     categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        //       ._id
        //   ).populate({
        //       path: "courses",
        //       match: { status: "Published" },
        //     }).exec()

        // console.log("Different COURSE", differentCategory)
        
        // Get top selling courses
        const allCategories = await Category.find()
        .populate({
            path:"courses",
            mathch:{status : "Published"},
            populate:{ path : "instructor"},
        })
        .exec();

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).splice(0,10)
        // console.log("MostSelling Courses",mostSellingCourses);

        // get Courses for diffent categories
        const differentCategories = await Category.find(
            {
                _id:{$ne: categoryId},
            }
        ).populate("courses")
        .exec();
        console.log("CategoryPageDetails Excuted Successfull .....")
        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                // differentCategory,
                differentCategories,
                mostSellingCourses,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Category Page Details"
        })
    }
}