

    require('dotenv').config({path:"../.env"})


if(!process.env.MONGO_URL){
     throw new Error("MONGO variable IS NOT EXIST")
}

module.exports={
    MONGO_URL:process.env.MONGO_URL,
}

// const path = require("path");

// require("dotenv").config({
//     path: path.join(__dirname, "../.env")
// });

// console.log("MONGO_URL =", process.env.MONGO_URL);
// console.log("All env keys:", Object.keys(process.env));

// if (!process.env.MONGO_URL) {
//     throw new Error("MONGO URL IS NOT EXIST");
// }

// module.exports = {
//     MONGO_URL: process.env.MONGO_URL
// };