
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const {Listing} = require("./models/listingModel");
// const listController = require("./controller/list");
const listRouter = require("./router/listRouter")
const user = require("./router/AuthRouter.js")
const dns = require("dns");
const {MONGO_URL} = require("./config/config.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpreeError = require("./utils/ExpressError.js");
var methodOverride = require('method-override');

// middlwares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use("/assets", express.static(path.join(__dirname, "assets")));

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

// user authentication router
app.use("/user", user)

// listing router
app.use("/listings",listRouter)


app.get("/", (req, res)=>{
    res.render("listing/Auth.ejs");
});



app.all("/*splate", (req, res, next)=>{
    next(new ExpreeError(404, "page not found"));
});

app.use((err, req, res, next)=>{
    const {statusCode = 500, message = "something went wrong"} = err;
    res.status(statusCode).render("listing/error.ejs", { message});
})

