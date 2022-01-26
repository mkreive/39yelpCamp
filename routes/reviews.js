const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLogedIn, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/reviews");

router.post("/", validateReview, isLogedIn, catchAsync(reviews.createReview));

router.delete(
    "/:reviewId",
    isLogedIn,
    isReviewAuthor,
    catchAsync(reviews.deleteReview)
);

module.exports = router;
