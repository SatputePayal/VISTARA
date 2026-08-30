const nodemailer = require("nodemailer")
const fs = require("fs")
const path = require("path")
const fileURLToPath = require("url")
const handlebars = require("handlebars")
const config = require("../config/config")

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const VerificationEmail = async(token, email)=>{

    const emailTemplateSource = fs.readFileSync(path.join(__dirname, "template.hbs"), "utf-8");

    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({token: encodeURIComponent(token)});

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
        },
        port: 465,
        host: "smtp.gmail.com"
    })

    // for testing purpose only
    console.log(config.EMAIL_USER);
    console.log(config.EMAIL_PASS);

    // logo path
    const vistara_logo_path = path.join(__dirname, "assest/vistara_logo.png");
    const emailConfiguration = {
        from:config.EMAIL_USER,
        to:email,
        subject: "User Verification",
        html:htmlToSend,
        attachments:[
            {
                filename: "vistara_logo.png",
                path: vistara_logo_path,
                cid: "vistara_logo"
            }
        ]
    }

    transport.sendMail(emailConfiguration, (err, info)=>{
        if(err){
            console.log(`Email error is: ${err}`)
        }
        else{
            console.log("Email sent successfully")
        }
    })
}

module.exports = VerificationEmail;