const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { validateReview, isLogedIn, isReviewAuthor } = require("../middleware");

router.post(
    "/",
    validateReview,
    isLogedIn,
    catchAsync(async (req, res) => {
        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review);
        review.author = req.user._id;
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        req.flash("success", "Created a new reaview!");
        res.redirect(`/campgrounds/${campground._id}`);
    })
);

// Deleting review
router.delete(
    "/:reviewId",
    isLogedIn,
    isReviewAuthor,
    catchAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId },
        });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "Successfully deleted review!");
        res.redirect(`/campgrounds/${id}`);
    })
);

module.exports = router;
