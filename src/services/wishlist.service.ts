const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");

const wishlistService = {};

wishlistService.checkExistWishlist = async function (WishlistId) {
  const wishlist = Wishlist.findById(WishlistId);
  return !!wishlist;
};

wishlistService.getAllWishlists = async function (query) {
  const wishlists = await Wishlist.paginate(query);

  return wishlists;
};

wishlistService.getWishlistByUserId = async function (wishlistId) {
  u;
  const wishlist = await Product.paginate(wishlistId);

  if (!wishlistId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Wishlist is not found",
      "Get single wishlist"
    );
  }
  return wishlist;
};

wishlistService.createWishlist = async function (wishlistBody) {
  const wishlist = await Wishlist.create(wishlistBody);

  return wishlist;
};

wishlistService.updateWishlistById = async function (wishlistId, wishlistBody) {
  let wishlist = await Wishlist.findById(wishlistId);

  if (!wishlist) {
    throw new AppError(404, "Wishlist Not Found", "Update wishlist");
  }

  Object.keys(wishlistBody).forEach((field) => {
    if (wishlistBody[field] !== undefined) {
      wishlist[field] = wishlistBody[field];
    }
  });
  return wishlist;
};

wishlistService.deleteWishlistById = async function (wishlistId) {
  const wishlist = await Wishlist.findByIdAndUpdate(wishlistId, {
    isDeleted: true,
  });
  if (!wishlist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Wishlist is not found",
      "Delete single wishlist"
    );
  }
  return wishlist;
};

module.exports = wishlistService;
