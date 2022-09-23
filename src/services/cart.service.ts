const cartService = {
  checkExistCart: async function (userId) {
    const cart = Cart.findOne({ userId });
    return !!cart;
  },
  getAllCarts: async function (query) {
    const carts = await Cart.paginate(query);

    return carts;
  },

  getCartById: async function (userId) {
    let filter = { userId };

    let cart = await Cart.findOne(filter);

    if (!cart) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Cart is not found",
        "Get single cart"
      );
    }

    const cartItem = await cartItemService.getAllCartItemByCartId(cart._id);

    let carts = { cart, products: cartItem };

    return carts;
  },

  createCart: async function (userId) {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      throw new AppError(404, "Cart is Exists", "Create cart");
    }

    cart = await Cart.create({ userId });

    return cart;
  },

  updateCartById: async function (userId, cartBody, cartId, role) {
    delete cartBody._id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new AppError(404, "Cart Not Found", "Update cart");
    }

    Object.keys(cartBody).forEach((field) => {
      if (cartBody[field] !== undefined) {
        cart[field] = cartBody[field];
      }
    });

    await cart.save();
    return cart;
  },

  deleteCartById: async function (cartId) {
    const cart = await Cart.findByIdAndUpdate(cartId, {
      isDeleted: true,
    });
    if (!cart) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Cart is not found",
        "Delete single cart"
      );
    }
    return cart;
  },
};
export default cartService;
