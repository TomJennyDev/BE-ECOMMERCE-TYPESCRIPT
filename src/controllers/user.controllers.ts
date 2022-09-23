import { NextFunction, Request, Response } from "express";

const userController = {
  getCurrentUser: catchAsync(async (req, res) => {
    const { id } = req.user;
    let user = await userService.getUserById(id);

    const token = user.generateToken();

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      user,
      null,
      "Get current user successfully"
    );
  }),
  createUserByEmailPassword: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let user = await userService.createUser(req.body);

      const token = user.generateToken();

      user = user.filterOutputUser();

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        { user, accessToken: token },
        null,
        "User is register successfully"
      );
    }
  ),

  updateCurrentUser: catchAsync(async (req, res) => {
    const { id } = req.user;

    await userService.updateUserById(id, req.body);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      {},
      null,
      "Update current user successfully"
    );
  }),
  deleteCurrentUser: catchAsync(async (req, res) => {
    const { id } = req.user;
    await userService.deleteUserById(id);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      {},
      null,
      "Delete current user successfully"
    );
  }),

  getSingleUserById: catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      user,
      null,
      "Get user successfully"
    );
  }),

  getAllUsersList: catchAsync(async (req, res) => {
    const { query } = req;
    let users = await userService.getAllUsersList(query);
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      users,
      null,
      "Get User List successfully"
    );
  }),

  updateUserById: catchAsync(async (req, res) => {
    const { id } = req.params;

    await userService.updateUserById(id, req.body);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      {},
      null,
      "Update user successfully"
    );
  }),

  deleteUserById: catchAsync(async (req, res) => {
    const { id } = req.params;

    await userService.deleteUserById(id);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      {},
      null,
      "Delete user successfully"
    );
  }),
};
export default userController;
