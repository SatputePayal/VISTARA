const User = require("../models/userAuthrntication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Session = require("../models/userSession")

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

const get_login = (req, res)=>{
    return res.render("listing/login.ejs");
}

const login_user = async(req, res)=>{
    try {
        
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(403).json({
                success: false,
                message: "Unauthorized user"
            })
        }

        const passwordChecker = await bcrypt.compare(password, checkUser.password);
        if(! passwordChecker){
            return res.status(402).json({
                success: false,
                message: "Incorrect password"
            })
        }

        // check if sessionID is exist then delete it
        const existingSession = await Session.findOne({userID: checkUser._id})
        if(existingSession){
            const deleteSession = await Session.deleteMany({userID: checkUser._id})
        }

        // creating new sesion
        const createSession = await Session.create({userID: checkUser._id})
        console.log("Created session is:-", createSession)

        // Access token
        const AccessToken = jwt.sign({id: checkUser._id}, config.SECRET_KEY, {expiresIn: "3d"});

        // Refresh token
        const RefreshToken = jwt.sign({id: checkUser._id}, config.SECRET_KEY, {expiresIn: "6d"});
    
        checkUser.isLogged = true;
        await checkUser.save();

        return res.status(200).redirect("/listings")

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    userRegister,
   get_login,
   login_user
};