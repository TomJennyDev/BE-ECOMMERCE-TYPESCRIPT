import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../config/config";
import { AppError } from "../helpers/utils";

const authMiddleware = {
  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    try {
      if (role !== config.role.admin) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "FORBIDDEN",
          "Authorization error"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};
export default authMiddleware;
