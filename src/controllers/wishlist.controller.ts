const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
import { NextFunction, Request, Response } from "express";

const wishListController = {
  getAllWishlist: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        Wishlist,
        "",
        "Wishlist is login successfully"
      );
    }
  ),

  getWishlistById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        Wishlist,
        "",
        "Wishlist is login successfully"
      );
    }
  ),

  updateWishlistById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        Wishlist,
        "",
        "Wishlist is login successfully"
      );
    }
  ),

  deleteWishlistById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        {},
        "",
        "Wishlist is login successfully"
      );
    }
  ),
};
export default wishListController;
