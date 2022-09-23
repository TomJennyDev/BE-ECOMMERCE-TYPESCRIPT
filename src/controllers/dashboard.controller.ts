const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const dashboardService = require("../services/dashboard.service");
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const dashboardController = {};

dashboardController.getAllInfoDashboard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const info = await dashboardService.GetAllInfoDashboard(req.query);
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      info,
      "",
      "Get All information in Dashboard successfully"
    );
  }
);

module.exports = dashboardController;
