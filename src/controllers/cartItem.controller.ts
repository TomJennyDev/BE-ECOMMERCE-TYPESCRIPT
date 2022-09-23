const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const cartItemService = require("../services/cartItem.service");
import { NextFunction, Request, Response } from "express";
const cartItemController = {
  addCartItem: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId } = req.user;
      const { id: productId } = req.params;
      await cartItemService.addCartItem(userId, productId);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        {},
        "",
        "Add item to cart successfully"
      );
    }
  ),

  updateCartItem: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId } = req.user;
      const totalItem = await cartItemService.updateCartItem(userId, req.body);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        totalItem,
        "",
        "Update Cart item  successfully"
      );
    }
  ),

  deleteCartItem: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId } = req.user;

      const totalItem = await cartItemService.deleteCartItem(userId, req.body);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        totalItem,
        "",
        "Delete Cart successfully"
      );
    }
  ),
};

export default cartItemController;
