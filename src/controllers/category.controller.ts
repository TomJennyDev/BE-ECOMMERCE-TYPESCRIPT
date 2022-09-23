const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const categoryService = require("../services/category.service");
import { NextFunction, Request, Response } from "express";
const categoryController = {};

categoryController.getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryService.getAllCatgories(req);
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      categories,
      "",
      "Get Categories successfully"
    );
  }
);

categoryController.getCategoryById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await categoryService.getCategoryById(id);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      category,
      "",
      "Get Category successfully"
    );
  }
);

categoryController.createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryService.createCategory(req.body);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      category,
      "",
      "Create Category successfully"
    );
  }
);

categoryController.createSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await categoryService.updateCategoryById(id, req.body);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      category,
      "",
      "Create Category successfully"
    );
  }
);

categoryController.updateCategoryById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await categoryService.updateCategoryById(id, req.body);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      category,
      "",
      "Update Category successfully"
    );
  }
);

categoryController.deleteCategoryById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await categoryService.deleteCategoryById(id);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      {},
      "Delete Category successfully"
    );
  }
);

module.exports = categoryController;
