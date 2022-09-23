import express from "express";
const reactionCtr = require("../controllers/reaction.controller");
const { loginRequired } = require("../middlewares/passport");
const { reactionVal, tokenVal } = require("../validation");

const reactionRouter = express.Router();

reactionRouter.post(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  reactionCtr.createReaction
);

export default reactionRouter;
