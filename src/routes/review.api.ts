import express from "express";
const reviewCtr = require("../controllers/review.controller");
const { loginRequired } = require("../middlewares/passport");
const { reviewVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const reviewRouter = express.Router();

/* GET reviews listing. */
//customers
reviewRouter.get(
  "/public/:id",
  //   validate(reviewVal.getAllReviewsPublic, ["body"]),
  reviewCtr.getReviewByProductId
);

reviewRouter.post(
  "/me/create/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(reviewVal.createreview, ["body"]),
  loginRequired,
  reviewCtr.createReview
);

reviewRouter.put(
  "/me/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  //   validate(reviewVal.updateReview, ["body"]),
  reviewCtr.updateReviewById
);
reviewRouter.delete(
  "/me/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  reviewCtr.deleteReviewById
);

//adminsitrators
reviewRouter.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  reviewCtr.getAllReviews
);

reviewRouter.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(reviewVal.getReview, ["body"]),
  loginRequired,
  isAdmin,
  reviewCtr.getReviewByProductId
);

reviewRouter.post(
  "/create/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(reviewVal.createreview, ["body"]),
  loginRequired,
  isAdmin,
  reviewCtr.createReview
);

reviewRouter.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  //   validate(reviewVal.updateReview, ["body"]),
  reviewCtr.updateReviewById
);

reviewRouter.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  reviewCtr.deleteReviewById
);

export default reviewRouter;
