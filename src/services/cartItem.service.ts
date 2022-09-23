const cartItemService = {
  calTotalItem: async function (cartId) {
    let totalItem = await CartItem.countDocuments({ cartId });
    const cart = await Cart.findOne({ _id: cartId });
    cart.totalItem = totalItem;
    cart.save();
    return totalItem;
  },

  getAllCartItemByCartId: async function (cartId) {
    let query = { cartId, populate: "productId", select: "-_id -cartId" };

    const cartItem = await CartItem.paginate(query);

    return { ...cartItem };
  },

  updateCartItem: async function (userId, cartItemBody) {
    const { productId, action } = cartItemBody;
    let totalItem = 0;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Cart is not found",
        "Add item to cart"
      );
    }

    const product = await productService.checkExistProduct(productId);

    if (!product) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Product is not found",
        "Add item to cart"
      );
    }

    let cartitem = await CartItem.findOne({ cartId: cart._id, productId });

    if (cartitem) {
      action ? (cartitem.quantity += 1) : (cartitem.quantity -= 1);

      await cartitem.save();
      totalItem = await cartItemService.calTotalItem(cart._id);
    }

    if (!cartitem) {
      cartitem = { cartId: cart._id, productId, quantity: 1 };

      await CartItem.create(cartitem);
      totalItem = await cartItemService.calTotalItem(cart._id);
    }

    return totalItem;
  },

  deleteCartItem: async function (userId, cartItemBody) {
    let { productId } = cartItemBody;

    let arrProductId = productId.map((e) => Types.ObjectId(e));

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Cart is not found",
        "Add item to cart"
      );
    }

    const cartItem = await CartItem.find({
      cartId: cart._id,
      productId: { $in: arrProductId },
    });

    if (cartItem.length !== arrProductId.length || !cartItem.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Product is not found",
        "Delete item of cart"
      );
    }

    await CartItem.deleteMany({
      cartId: cart._id,
      productId: { $in: arrProductId },
    });
    const totalItem = await cartItemService.calTotalItem(cart._id);
    return totalItem;
  },
};
export default cartItemService;
