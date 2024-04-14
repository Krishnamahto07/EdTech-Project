const Tag = require("../models/Tags")

// Create Tag ka handler functions

exports.createTag = async(req,res) =>{
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

exports.showAllTags = async(req,res) =>{
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