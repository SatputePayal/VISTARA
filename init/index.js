const express = require("express");
const app = express();
const mongoose = require('mongoose');
const initData = require("./data.js");
const {Listing} = require("../models/listingModel.js");
const dns = require("dns");
const {MONGO_URL} = require("../config/config.js");
console.log(MONGO_URL)

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

async function main(){
    console.log(MONGO_URL)
  await mongoose.connect(MONGO_URL);
}
main().then((result)=>{
    console.log("index.js is connect successfully to mongoose is!")
})
.catch((failure)=>{
    console.log("index.js is fail to connect with mongoose!");
});

const Operation = async()=>{

await Listing.deleteMany({});
initData.data = initData.data.map((obj) => ({...obj}));
await Listing.insertMany(initData.data);
console.log("data was inserted successfully");
}

Operation().then((result)=>{
    console.log("data.js file connected successfully")
}).catch((error)=>{
    console.log(error);
})