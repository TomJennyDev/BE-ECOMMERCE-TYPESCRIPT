import mongoose, { ObjectId, Schema } from "mongoose";
import paymentSchema, { IPayment } from "./Payment";
import paginate from "./plugin/paginate.plugin";
import Product from "./Product";
import shippingSchema, { IShipping } from "./Shipping";

interface ProductOrder {
  productId: ObjectId;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrders {
  userId: ObjectId;
  cartId: ObjectId;
  isCustomerUpdated: boolean;
  shipping: IShipping;
  payment: IPayment;
  status: "pending" | "delivered" | "refunded" | "cancel";
  products: ProductOrder[];
  isDeleted: boolean;
}

const orderSchema = new Schema<IOrders>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    cartId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Carts",
    },
    isCustomerUpdated: { type: Boolean, default: false },
    shipping: shippingSchema,
    payment: paymentSchema,
    status: {
      type: String,
      enum: ["pending", "delivered", "refunded", "cancel"],
      default: "pending",
    },
    products: [
      {
        productId: [Product.schema],
        quantity: { type: Number },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(paginate);

const Order = mongoose.model("Orders", orderSchema);
export default Order;
