import express from "express";
const wishlistCtr = require("../controllers/wishlist.controller");
const { loginRequired } = require("../middlewares/passport");
const { wishlistVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const wishlistRouter = express.Router();

/* GET wishlists listing. */

wishlistRouter.get(
  "/me",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  //   validate(wishlistVal.getAllwishlistsPublic, ["body"]),
  wishlistCtr.getWishlistById
);

wishlistRouter.get(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  //   validate(wishlistVal.getAllwishlistsPublic, ["body"]),
  wishlistCtr.updateWishlistById
);

//adminsitrators
wishlistRouter.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  wishlistCtr.getAllCategories
);

wishlistRouter.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(wishlistVal.getwishlist, ["body"]),
  loginRequired,
  isAdmin,
  wishlistCtr.getWishlistById
);

wishlistRouter.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(wishlistVal.createwishlist, ["body"]),
  loginRequired,
  isAdmin,
  wishlistCtr.createWishlist
);

wishlistRouter.put(
  "/createsub/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  //   validate(wishlistVal.updatewishlist, ["body"]),
  wishlistCtr.createSubWishlist
);

wishlistRouter.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  //   validate(wishlistVal.updatewishlist, ["body"]),
  wishlistCtr.updateWishlistById
);

wishlistRouter.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  wishlistCtr.deleteWishlistById
);

export default wishlistRouter;
