import express from "express";
const productCtr = require("../controllers/productRouter.controller");
const { loginRequired } = require("../middlewares/passport");
const { productVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const productRouter = express.Router();

/* GET products listing. */

productRouter.get(
  "/public",
  //   validate(productVal.getAllProductsPublic, ["body"]),
  productCtr.getAllProducts
);

productRouter.get(
  "/public/:id",
  //   validate(productVal.getAllProductsPublic, ["body"]),
  productCtr.getProductById
);

//adminsitrators
productRouter.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  productCtr.getAllProducts
);

productRouter.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(productVal.getProduct, ["body"]),
  loginRequired,
  isAdmin,
  productCtr.getProductById
);

productRouter.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(productVal.createproduct, ["body"]),
  loginRequired,
  isAdmin,
  productCtr.createProduct
);

productRouter.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  //   validate(productVal.updateProduct, ["body"]),
  productCtr.updateProductById
);
productRouter.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  loginRequired,
  isAdmin,
  productCtr.deleteProductById
);

export default productRouter;
