const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLogedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");

router.get("/", catchAsync(campgrounds.index));

router.get("/new", isLogedIn, campgrounds.renderNewForm);

router.post(
    "/",
    isLogedIn,
    validateCampground,
    catchAsync(campgrounds.createCampground)
);

router.get("/:id", catchAsync(campgrounds.showCampground));

router.get(
    "/:id/edit",
    isLogedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditForm)
);

router.put(
    "/:id",
    isLogedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
);

router.delete(
    "/:id",
    isLogedIn,
    isAuthor,
    catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
