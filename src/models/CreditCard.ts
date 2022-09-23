import { Schema } from "mongoose";

export interface ICreditCard {
  cardHolder: string;
  cardNumber: string;
  expDate: string;
  cardCVV: string;
  cardIssuer: string;
}

const creditCardSchema = new Schema<ICreditCard>(
  {
    cardHolder: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expDate: { type: String, required: true },
    cardCVV: { type: String, required: true },
    cardIssuer: { type: String, required: true },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

export default creditCardSchema;
