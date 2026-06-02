require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const {Listing} = require("./models/listingModel");
const listController = require("./controller/list");
const listRouter = require("./router/listRouter")
const dns = require("dns");
const {MONGO_URL} = require("./config/config.js");
const path = require("path");
const ejsMate = require("ejs-mate");

// middlwares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const port = 8080;
app.listen(port,()=>{
    console.log("server is working on port 8080");
});

async function main(){
  await mongoose.connect(MONGO_URL);
}
main().then((result)=>{
    console.log("mongoose is connect successfully!")
})
.catch((failure)=>{
    console.log("mongoose is not connecting successfully!");
});

// routing started
app.use("/listings",listRouter)

app.get("/", (req, res)=>{
    res.send("Home is working successfully!");
})

