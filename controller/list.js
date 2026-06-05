const {Listing} = require("../models/listingModel");

module.exports.get_Listing = async(req, res)=>{
const showData = await Listing.find({});
    res.render("listing/lists.ejs", {showData});
}

module.exports.get_Form = (req, res)=>{
    res.render("listing/newList.ejs");
}