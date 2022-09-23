const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");
const productService = require("../services/product.service");
import { NextFunction, Request, Response } from "express";
const productController = {
  getAllProducts: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const products = await productService.getAllProducts(req.query, req.user);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        products,
        "",
        "Get Products successfully"
      );
    }
  ),

  getProductById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        product,
        "",
        "get Product successfully"
      );
    }
  ),

  createProduct: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const product = await productService.createProduct(req.body);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        product,
        "",
        "Create Product successfully"
      );
    }
  ),

  updateProductById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const product = await productService.updateProductById(id, req.body);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        product,
        "",
        "Update Product successfully"
      );
    }
  ),

  deleteProductById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      await productService.deleteProductById(id);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        {},
        "",
        "Delete product successfully"
      );
    }
  ),
};
export default productController;
