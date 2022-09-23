const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");

const wishListchema = Schema(
  {
    productId: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    userId: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

wishListchema.plugin(paginate);

const WishList = mongoose.model("WishLists", wishListchema);
module.exports = WishList;
