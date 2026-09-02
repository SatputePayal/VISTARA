const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Session = mongoose.model("Session", SessionSchema)

module.exports = Session;