import express from "express";
import authRouter from "./auth.api";
import cartRouter from "./cart.api";
import cartItemRouter from "./cartItem.api";
import categoryRouter from "./category.api";
import dashboardRouter from "./dashboard.api";
import orderRouter from "./order.api";
import productRouter from "./product.api";
import reactionRouter from "./reaction.api";
import reviewRouter from "./review.api";
import usersRouter from "./users.api";
import wishlistRouter from "./wishlist.api";

const router = express.Router();

/* GET home page. */

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/cartitem", cartItemRouter);
router.use("/review", reviewRouter);
router.use("/reaction", reactionRouter);
router.use("/dashboard", dashboardRouter);
router.use("/wishlist", wishlistRouter);

export default router;
