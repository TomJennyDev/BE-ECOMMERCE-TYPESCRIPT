import express from "express";
const dashboardCtr = require("../controllers/dashboard.controller");
const { loginRequired } = require("../middlewares/passport");
const { dashboardVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const dashboardRouter = express.Router();

dashboardRouter.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  dashboardCtr.getAllInfoDashboard
);

export default dashboardRouter;
