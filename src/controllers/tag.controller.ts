const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
import { NextFunction, Request, Response } from "express";
const TagController = {};

TagController.getAllTags = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      Tags,
      "",
      "User is login successfully"
    );
  }
);

TagController.getTagById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      Tag,
      "",
      "User is login successfully"
    );
  }
);

TagController.updateTagById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      Tag,
      "",
      "User is login successfully"
    );
  }
);

TagController.deleteTagById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      {},
      "",
      "User is login successfully"
    );
  }
);

module.exports = TagController;
