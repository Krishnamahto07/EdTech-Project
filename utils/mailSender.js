const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


const mailSender = async(email,title,body) =>{
    try{

        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        
        
        let info = await transpoter.sendMail({
            from:'StudyNotion || Radhe Radhe',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        return info;
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports = mailSender;