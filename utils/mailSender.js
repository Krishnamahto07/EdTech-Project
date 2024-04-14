const nodemailer = require("nodemailer");

const mailSender = async(email,title,body) =>{
    try{
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_USER,
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
        console.log(info);
        return info;
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports = mailSender;