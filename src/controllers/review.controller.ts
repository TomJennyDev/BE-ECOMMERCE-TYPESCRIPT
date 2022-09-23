import { NextFunction, Request, Response } from "express";
import catchAsync from "../helpers/utils";
const reviewService = require("../services/review.service");
const reviewController = {
  getAllReviews: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { query } = req;
      const reviews = await reviewService.getAllReviews(query);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        reviews,
        "",
        "Get Reviews successfully"
      );
    }
  ),

  getReviewByProductId: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: productId } = req.params;
      const review = await reviewService.getReviewByProductId(productId);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        review,
        "",
        "Get Review successfully"
      );
    }
  ),

  createReview: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId, role } = req.user;
      const { id: productId } = req.params;

      const review = await reviewService.createReview(
        userId,
        productId,
        req.body,
        role
      );
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        review,
        "",
        "Create review successfully"
      );
    }
  ),

  updateReviewById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId, role } = req.user;
      const { id: reviewId } = req.params;

      const review = await reviewService.updateReviewById(
        userId,
        reviewId,
        req.body,
        role
      );
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        review,
        "",
        "Update review successfully"
      );
    }
  ),

  deleteReviewById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId, role } = req.user;
      const { id: reviewId } = req.params;

      await reviewService.deleteReviewById(userId, reviewId, role);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        {},
        "",
        "Delete Review successfully"
      );
    }
  ),
};
export default reviewController;
