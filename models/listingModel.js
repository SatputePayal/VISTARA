const mongoose = require("mongoose");
const { url } = require("node:inspector");
const Schema = mongoose.Schema;

listingSchema = new Schema({

    title: {
        type: String,
        required:[true,"Title must be requied "]

    },
    description: {
        type: String,
        required: [true,"Description must be requied "]

    },
    price: {
        type: Number,
        required:[true,"Price must be requied "]

    },
    location: {
        type: String,
        required: [true,"Location must be requied "]

    },
    country: {
        type: String,
        required: [true,"Country must be requied "]

    },

     image: {
        url: String,
        filename: String
        },

    });

module.exports.Listing =  mongoose.model("Listing", listingSchema);