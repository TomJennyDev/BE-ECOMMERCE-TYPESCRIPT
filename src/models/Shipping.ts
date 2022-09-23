import { Schema } from "mongoose";

export interface IShipping {
  email: string;
  phone: number;
  city: string;
  district: string;
  ward: string;
  address1: string;
  address2: string;
  deliveryTime: Date;
  method: string;
}

const shippingSchema = new Schema<IShipping>({
  email: { type: String },
  phone: { type: Number },
  city: { type: String },
  district: { type: String },
  ward: { type: String },
  address1: { type: String },
  address2: { type: String },
  deliveryTime: { type: Date },
  method: { type: String, enum: [5, 7, 1] },
});

export default shippingSchema;
