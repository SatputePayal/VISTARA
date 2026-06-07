const joi = require("joi");

const listingSchema = joi.object({

    Listing: joi.object(
        {

            title: joi.string().required(),
            description: joi.string().required(),
            image: joi.string().allow("", null),
            price: joi.number().required(),
            country: joi.string().required(),
            location: joi.string().required(),

        }
    ).required()
});

module.exports ={
    listingSchema
}