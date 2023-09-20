const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs")
require("dotenv").config();


const app = express();

mongoose.connect("mongodb://localhost:27017/E-Commerce")
.then(() => console.log("connected to Database"))
.catch((err) => console.log("error in database", err));

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());

fs.readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r))) 

app.listen(8080, () =>{
    console.log("Server has started ")
})