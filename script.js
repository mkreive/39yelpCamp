const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://localhost:27017/yelp-camp");
    console.log("MONGO CONNECTION OPEN!");
}

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campground", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});
