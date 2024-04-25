const express = require("express");
const app = express();

// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

//  import all require files
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary")

const fileUpload = require("express-fileupload");


const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// Database connect
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// frontend And Backend Connected Together
app.use(
    cors({
        origin:"http://localhost:3000",
    })
)

// File Upload k liye
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
cloudinaryConnect();

// Routes Mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


app.get("/",(req,res)=>{
    res.send("<h1>Study Notion</h1>")
})

app.listen(PORT,()=>{
    console.log(`App listen at ${PORT} `);
})