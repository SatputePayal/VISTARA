const {listingSchema} =require("./schema.js");
const ExpreeError = require("./utils/ExpressError.js");

module.exports.validationListing = (req, res, next)=>{
    const {error} = listingSchema.validate(req.body, {abortEarly: true});
    if(error){
        const errormsg = error.details.map((er)=> er.message).join(",");
        throw new ExpreeError(400, errormsg);
    } else{
        next();
    }

}