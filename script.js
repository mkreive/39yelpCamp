const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MONGO CONNECTION OPEN!");
}

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

// Home route
app.get("/", (req, res) => {
    res.render("home");
});

// Error handling
app.all("*", (req, res, next) => {
    next(new ExpressError("PAGE NOT FOUND!!!!", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!..";
    res.status(statusCode).render("error", { err });
});

//App listener
app.listen(3000, () => {
    console.log("Serving on port 3000");
});
