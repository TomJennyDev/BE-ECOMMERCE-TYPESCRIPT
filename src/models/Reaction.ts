import mongoose, { ObjectId, Schema, Types } from "mongoose";
import paginate from "./plugin/paginate.plugin";

interface IReaction {
  rate: number;
  refPaths: string;
  userId: ObjectId;
  targetId: ObjectId;
  isDeleted: boolean;
}

const reactionSchema = new Schema<IReaction>(
  {
    rate: { type: Number, min: 1, max: 5 },
    refPaths: {
      type: String,
      enum: ["Reviews", "Products"],
      require: true,
    },
    userId: { type: Types.ObjectId, refPath: "Users", required: true },
    targetId: {
      type: Types.ObjectId,
      refPath: "refPaths",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

reactionSchema.plugin(paginate);

reactionSchema.statics.calTotalRating = async function (targetId) {
  targetId = new Types.ObjectId(targetId);

  const totalRating = await this.aggregate([
    {
      $match: {
        targetId: targetId,
      },
    },
    {
      $group: {
        _id: "$targetId",
        totalRatings: { $sum: 1 },
        rateAverage: { $avg: "$rate" },
      },
    },
    {
      $project: {
        totalRatings: 1,
        rateAverage: { $round: ["$rateAverage", 1] },
      },
    },
  ]);

  return totalRating[0];
};

const Reaction = mongoose.model("Reactions", reactionSchema);

export default Reaction;
