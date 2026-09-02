const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userAuhtenticationModel = new Schema({
    username: {
        type: String,
        required: [true, "username must be required"]
    },
    email: {
        type: String,
        required: [true, "email must be required"],
        unique: true
    },
    password: {
        type: String,
        required : [true, "password must be required"]
    },
    otp: {
        type: String,
        default: null
    },
    isLogged: {
        type: Boolean,
        default: null
    },
    token: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    }
}, 
{timestamps: true})

const User = mongoose.model("User", userAuhtenticationModel)

module.exports = User