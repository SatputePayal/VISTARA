const User = require("../models/userAuthrntication");
const json = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async(req,res)=>{

    try {
        const {username, email, password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const userExist = await User.findOne({email})
        if(userExist){
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

        await NewUser.save()
        console.log(NewUser)

        // return res.status(201).json({
        //     success: true,
        //     message: `${username} registered successfully`
        // })
        return res.redirect("/listings");

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = userRegister;