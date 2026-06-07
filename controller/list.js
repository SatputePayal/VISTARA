
const {Listing} = require("../models/listingModel");

module.exports.get_Listing = async(req, res)=>{
const showData = await Listing.find({});
    res.render("listing/lists.ejs", {showData});
}

module.exports.get_Form = (req, res)=>{
    res.render("listing/newList.ejs");
}

module.exports.post_Form = async(req, res)=>{
    const addData = new Listing(req.body.Listing);
    console.log(req.file);
    let url;
    let filename;
    if(req.file){
        url = req.file.path;
        filename = req.file.filename;
    } else{
        url = "https://images.unsplash.com/photo-1774275979685-545e62da5438?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D";
        filename = "default-image"
    }

    console.log(addData);
    addData.image = {url, filename};
    addData.save()
    res.redirect("/listings");
}

module.exports.showList = async(req, res)=>{
    const {id} = req.params;
    const showListing = await Listing.findById(id);
    // console.log(showListing);
    res.render("listing/showList.ejs", {showListing});
}