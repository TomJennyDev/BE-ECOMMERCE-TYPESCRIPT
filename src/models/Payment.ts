import { Schema } from "mongoose";
import { ICreditCard } from "./CreditCard";

import creditCartSchema from "./CreditCard";

export interface IPayment {
  total: {
    subTotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
  method: "credit" | "cash" | "bankOnline";
  creditCards: ICreditCard;
}
const paymentSchema = new Schema<IPayment>(
  {
    total: {
      subTotal: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      shipping: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    method: {
      type: String,
      enum: ["credit", "cash", "bankOnline"],
    },
    creditCards: creditCartSchema,
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

export default paymentSchema;
