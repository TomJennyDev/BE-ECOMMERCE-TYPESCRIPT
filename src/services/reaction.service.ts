const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");
const Reaction = require("../models/Reaction");
const Review = require("../models/Reviews");

const reactionService = {
  checkExistReaction: async function (userId) {
    const reaction = Reaction.findOne({ userId });
    return !!reaction;
  },

  getAllReactions: async function (query) {
    const reactions = await Reaction.paginate(query);

    return reactions;
  },

  createReaction: async function (userId, reactionBody) {
    const { targetId, rate, refPaths } = reactionBody;

    let reaction = await Reaction.findOne({
      refPaths,
      targetId,
      userId,
    });

    let message = "";
    if (!reaction) {
      await Reaction.create({ refPaths, targetId, userId, rate });
      message = "Added reaction";
    } else {
      reaction.rate = rate;
      await reaction.save();

      message = "Updated reaction";
    }

    const totalRating = await Reaction.calTotalRating(targetId);

    if (refPaths === "Products") {
      await Product.findOneAndUpdate({ _id: targetId }, { ...totalRating });
    }

    if (refPaths === "Reviews") {
      await Review.findOneAndUpdate({ _id: targetId }, { ...totalRating });
    }

    return totalRating;
  },
};
export default reactionService;
