const {Listing} = require("../models/listingModel");

module.exports.get_Form = async(req, res)=>{
const showData = await Listing.find({});
    res.render("listing/lists.ejs", {showData});
}