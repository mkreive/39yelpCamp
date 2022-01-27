const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLogedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/new", isLogedIn, campgrounds.renderNewForm);

router
    .route("/")
    .get(catchAsync(campgrounds.index))
    .post(
        isLogedIn,
        upload.array("image"),
        validateCampground,
        catchAsync(campgrounds.createCampground)
    );

router
    .route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(
        isLogedIn,
        isAuthor,
        validateCampground,
        catchAsync(campgrounds.updateCampground)
    )
    .delete(isLogedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
    "/:id/edit",
    isLogedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
