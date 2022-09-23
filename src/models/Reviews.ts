import mongoose, { ObjectId, Schema, Types } from "mongoose";
import paginate from "./plugin/paginate.plugin";

export interface IReview {
  comments: string;
  image: string;
  isPurchased: boolean;
  totalRatings: number;
  rateAverage: number;
  userId: ObjectId[] | undefined;
  productId: ObjectId[] | undefined;
  isDeleted: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    comments: { type: String, required: true },
    image: { type: String },
    isPurchased: { type: Boolean, default: false },
    totalRatings: { type: Number, default: 0 },
    rateAverage: { type: Number, default: 0 },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "Users",
    },
    productId: {
      type: Types.ObjectId,
      required: true,
      ref: "Products",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

reviewSchema.plugin(paginate);

const Review = mongoose.model("Reviews", reviewSchema);
export default Review;
