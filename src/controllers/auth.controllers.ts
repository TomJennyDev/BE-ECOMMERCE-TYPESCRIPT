import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync, sendResponse } from "../helpers/utils";
const authController = {
  loginUserWithEmailPassword: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const user = await authService.loginUserWithEmailPassword(
        email,
        password
      );

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        user,
        "",
        "User is login successfully"
      );
    }
  ),

  loginUserWithGoogle: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await authService.loginUserWithSocial(req.user);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        user,
        "",
        "User is login successfully"
      );
    }
  ),

  loginUserWithFacebook: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await authService.loginUserWithSocial(req.user);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        user,
        "",
        "User is login successfully"
      );
    }
  ),

  resetUserPasswordWithEmail: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await emailService.sendResetPasswordEmail(req.body);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        {},
        "",
        "Please check your email box!"
      );
    }
  ),
};
export default authController;
