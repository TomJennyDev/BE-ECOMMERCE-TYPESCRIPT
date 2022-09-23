import express from "express";
import passportMiddleware from "../middlewares/passport";
import validators from "../middlewares/validators";
import { tokenVal } from "../validation";

const cartItemCtr = require("../controllers/cartItem.controller");

const cartItemRouter = express.Router();

/* GET carts listing. */

cartItemRouter.put(
  "/me/update",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  //   validate(cartVal.getAllcartsPublic, ["body"]),
  cartItemCtr.updateCartItem
);

cartItemRouter.delete(
  "/me/delete",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  //   validate(cartVal.getAllcartsPublic, ["body"]),
  cartItemCtr.deleteCartItem
);

export default cartItemRouter;
