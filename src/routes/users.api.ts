import express from "express";
const UserCtr = require("../controllers/user.controllers");
const { loginRequired } = require("../middlewares/passport");
const { userVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const usersRouter = express.Router();

/* GET users listing. */
//customers
usersRouter.post(
  "/",
  validate(userVal.createUser, ["body"]),
  UserCtr.createUserByEmailPassword
);

usersRouter.get(
  "/me",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  UserCtr.getCurrentUser
);

usersRouter.put(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  validate(userVal.updateUser, ["body"]),
  loginRequired,
  UserCtr.updateCurrentUser
);

usersRouter.delete(
  "/me/delete",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  UserCtr.deleteCurrentUser
);

// administrators
usersRouter.post(
  "/create",
  validate(userVal.createUserWithAdmin, ["body"]),
  UserCtr.createUserByEmailPassword
);

usersRouter.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  validate(userVal.getUsers, ["body"]),
  loginRequired,
  isAdmin,
  UserCtr.getAllUsersList
);

usersRouter.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  UserCtr.getSingleUserById
);

usersRouter.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  validate(userVal.updateUserWithAdmin, ["body"]),
  UserCtr.updateUserById
);

usersRouter.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  UserCtr.deleteUserById
);

export default usersRouter;
