import express from "express";
const categoryCtr = require("../controllers/category.controller");
const { loginRequired } = require("../middlewares/passport");
const { categoryVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const categoryRouter = express.Router();

/* GET categorys listing. */

categoryRouter.get(
  "/public",
  //   validate(categoryVal.getAllcategorysPublic, ["body"]),
  categoryCtr.getAllCategories
);

categoryRouter.get(
  "/public/:id",
  //   validate(categoryVal.getAllcategorysPublic, ["body"]),
  categoryCtr.getCategoryById
);

//adminsitrators
categoryRouter.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  categoryCtr.getAllCategories
);

categoryRouter.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(categoryVal.getcategory, ["body"]),
  loginRequired,
  isAdmin,
  categoryCtr.getCategoryById
);

categoryRouter.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(categoryVal.createcategory, ["body"]),
  loginRequired,
  isAdmin,
  categoryCtr.createCategory
);

categoryRouter.put(
  "/createsub/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  //   validate(categoryVal.updatecategory, ["body"]),
  categoryCtr.createSubCategory
);

categoryRouter.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  //   validate(categoryVal.updatecategory, ["body"]),
  categoryCtr.updateCategoryById
);

categoryRouter.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  categoryCtr.deleteCategoryById
);

export default categoryRouter;
