import mongoose, { ObjectId, Schema, Types } from "mongoose";
import paginate from "./plugin/paginate.plugin";

interface ICartItem {
  cartId: ObjectId;
  productId: ObjectId;
  quantity: number;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    cartId: { type: Types.ObjectId, required: true, ref: "Carts" },
    productId: { type: Types.ObjectId, required: true, ref: "Products" },
    quantity: { type: Number, min: 1 },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

cartItemSchema.plugin(paginate);

cartItemSchema.index({ cartId: 1, productId: 1 }, { unique: true });

const CartItem = mongoose.model("CartItems", cartItemSchema);
export default CartItem;
