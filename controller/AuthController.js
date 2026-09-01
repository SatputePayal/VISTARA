const User = require("../models/userAuthrntication");
const bcrypt = require("bcrypt");
const VerificationEmail = require("../verifyEmail/userVerify");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const userRegister = async (req, res) => {

    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: `${email} is already exists`
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const NewUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        token = jwt.sign({ id: NewUser._id }, config.SECRET_KEY, { expiresIn: '5m' })
        await VerificationEmail(token, email);
        NewUser.token = token
        await NewUser.save()
        console.log(NewUser)

        return res.redirect("/listings");

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

TokenVerification = async (req, res) => {
    try {
        // const authHeader = req.headers.authorization;
        // if (!authHeader || !authHeader.startsWith("Bearer ")) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Authorization token is invalid or missing..."
        //     })
        // }

        const {token} = req.query;
        if(!token){
            return res.status(400).json({
                success: false,
                message:"Verification token is missing"
            })
        }
        let decode;
        try {
            decode = jwt.verify(token, config.SECRET_KEY)
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(400).json({
                    success: false,
                    message: "The registration token has been expired"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            })
        }
        const user = await User.findById(decode.id)
        if(!user){
            return res.status(400).json({
                success: false,
                message: "user not exist"
            })
        }
        user.token = true;
        user.isVerified = true;
        await user.save();

        // return res.status(200).json({
        //     success: false,
        //     message: `${user.username} is verified successfully`
        // })

        res.render("listing/login.ejs")

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const Verified = async(req, res)=>{
    const {token} = req.headers;
    const Verifiecation_link = `http://localhost:8080/auth/verification?token=${token}`;
    res.render("listing/login.ejs", Verifiecation_link)
}

module.exports = {
    userRegister,
    TokenVerification,
    Verified
};