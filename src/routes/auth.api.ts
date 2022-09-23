import express from "express";
import validators from "../middlewares/validators";
const { checkSchema } = require("express-validator");

const authCtr = require("../controllers/auth.controllers");
const { loginGoogle, loginFacebook } = require("../middlewares/passport");
const authVal = require("../validation/auth.validation");

const authRouter = express.Router();

/* GET users listing. */
// validate(login)
authRouter.post(
  "/login",
  validators.validate(authVal.login, ["body"]),
  authCtr.loginUserWithEmailPassword
);

authRouter.post("/google", loginGoogle, authCtr.loginUserWithGoogle);

authRouter.post("/facebook", loginFacebook, authCtr.loginUserWithFacebook);

authRouter.post(
  "/resetpassword",
  validators.validate(authVal.resetPassword, ["body"]),
  authCtr.resetUserPasswordWithEmail
);

export default authRouter;
