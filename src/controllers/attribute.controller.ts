import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync, sendResponse } from "../helpers/utils";
import Attributes from "../models/Attributes";

const attributeController = {
  getAllAttributes: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        Attributes,
        "",
        "User is login successfully"
      );
    }
  ),

  getAttributeById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        Attributes,
        "",
        "User is login successfully"
      );
    }
  ),

  updateAttributeById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        Attributes,
        "",
        "User is login successfully"
      );
    }
  ),

  deleteAttributeById: catchAsync(
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
  ),
};

module.exports = attributeController;
