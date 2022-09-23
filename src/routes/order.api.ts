import express from "express";
const orderCtr = require("../controllers/order.controller");
const { loginRequired } = require("../middlewares/passport");
const { orderVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const orderRouter = express.Router();

/* GET orders listing. */

orderRouter.get(
  "/me",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  //   validate(orderVal.getAllordersPublic, ["body"]),
  orderCtr.getOrderByUser
);

orderRouter.post(
  "/me/create",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  //   validate(orderVal.getAllordersPublic, ["body"]),
  orderCtr.createOrder
);

orderRouter.put(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  //   validate(orderVal.getAllordersPublic, ["body"]),
  orderCtr.updateOrderById
);

//adminsitrators
orderRouter.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  orderCtr.getAllOrders
);

orderRouter.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(orderVal.getorder, ["body"]),
  loginRequired,
  isAdmin,
  orderCtr.getOrderById
);

orderRouter.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(orderVal.createorder, ["body"]),
  loginRequired,
  isAdmin,
  orderCtr.createOrder
);

orderRouter.put(
  "/update",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  //   validate(orderVal.updateorder, ["body"]),
  orderCtr.updateOrderById
);

orderRouter.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  orderCtr.deleteOrderById
);

export default orderRouter;
