import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const Cart = require("../models/Cart");
const cartService = require("../services/cart.service");

const cartController = {
  getAllCarts: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const carts = await cartService.getAllCarts(req.query);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        carts,
        "",
        "Get Carts successfully"
      );
    }
  ),

  getCartById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId, role } = req.user;
      const { id: cartId } = req.params;
      const cart = await cartService.getCartById(userId, cartId, role);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        cart,
        "",
        "get Cart successfully"
      );
    }
  ),

  createCart: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.user;
      const cart = await cartService.createCart(id);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        cart,
        "",
        "Create Cart successfully"
      );
    }
  ),

  updateCartById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId, role } = req.user;
      const { id: cartId } = req.params;
      const cart = await cartService.updateCartById(
        userId,
        req.body,
        cartId,
        role
      );
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        cart,
        "",
        "Update Cart successfully"
      );
    }
  ),

  deleteCartById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      await cartService.deleteCartById(id);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        {},
        "",
        "Delete cart successfully"
      );
    }
  ),
};

export cartController;
