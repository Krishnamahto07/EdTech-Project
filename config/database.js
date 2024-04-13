const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGOOSE_URL,{})
    .then(()=> console.log("DB connected"))
    .catch((err)=>{
        console.log("DB connection fail");
        console.error(err);
        process.exit(1);
    })
};