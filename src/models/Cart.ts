import mongoose, { ObjectId, Schema, Types } from "mongoose";
import paymentSchema from "./Payment";
import paginate from "./plugin/paginate.plugin";
import shippingSchema, { IShipping } from "./Shipping";

export interface ICart {
  userId: ObjectId;
  shipping: IShipping;
  payment: string;
  status: "Cart" | "Delivery" | "Payment" | "Summary";
  totalItem: number;
  isDeleted: boolean;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      unique: true,
      ref: "Users",
    },
    shipping: shippingSchema,
    payment: paymentSchema,
    status: {
      type: String,
      enum: ["Cart", "Delivery", "Payment", "Summary"],
      default: "Cart",
    },
    totalItem: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

cartSchema.plugin(paginate);

const Cart = mongoose.model("Carts", cartSchema);
export default Cart;
