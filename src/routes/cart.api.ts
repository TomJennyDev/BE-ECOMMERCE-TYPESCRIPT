import express from "express";
import cartCtr from "../controllers/cart.controller";
import authMiddleware from "../middlewares/authorization";
import passportMiddleware from "../middlewares/passport";
import validators from "../middlewares/validators";
import { tokenVal } from "../validation";

const cartRouter = express.Router();

/* GET carts listing. */

cartRouter.get(
  "/me",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  //   validators.validate(cartVal.getAllcartsPublic, ["body"]),
  cartCtr.getCartById
);

cartRouter.post(
  "/me/create",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  //   validators.validate(cartVal.getAllcartsPublic, ["body"]),
  cartCtr.createCart
);

cartRouter.put(
  "/me/update",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  //   validators.validate(cartVal.getAllcartsPublic, ["body"]),
  cartCtr.updateCartById
);

//adminsitrators
cartRouter.get(
  "/",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  authMiddleware.isAdmin,
  cartCtr.getAllCarts
);

cartRouter.get(
  "/:id",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  //   validators.validate(cartVal.getcart, ["body"]),
  passportMiddleware.loginRequired,
  authMiddleware.isAdmin,
  cartCtr.getCartById
);

cartRouter.put(
  "/update/:id",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  authMiddleware.isAdmin,
  //   validators.validate(cartVal.updatecart, ["body"]),
  cartCtr.updateCartById
);

cartRouter.delete(
  "/delete/:id",
  validators.validate(tokenVal.verifyToken, ["headers"]),
  passportMiddleware.loginRequired,
  authMiddleware.isAdmin,
  cartCtr.deleteCartById
);

export default cartRouter;
