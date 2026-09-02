const User = require("../models/userAuthrntication");
const bcrypt = require("bcrypt");
// const VerificationEmail = require("../verifyEmail/userVerify");
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
module.exports = {
    userRegister,
   
};