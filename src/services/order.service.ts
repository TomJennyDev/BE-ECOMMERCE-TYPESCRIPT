const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Order = require("../models/Order");
const { Types } = require("mongoose");
const CartItem = require("../models/CartItem");
const { startSession } = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const orderService = {
  checkExistOrder: async function (OrderId) {
    const order = Order.findById(OrderId);
    return !!order;
  },

  getAllOrders: async function (query) {
    query.populate = "userId";
    query.sortBy = "createdAt.desc";

    const { deliveryStart, deliveryEnd } = query;

    if (deliveryStart) {
      query["shipping.deliveryTime"] = { $gte: new Date(deliveryStart) };
      delete query.deliveryStart;
    } else if (deliveryStart && deliveryEnd) {
      query["shipping.deliveryTime"] = {
        $gte: new Date(deliveryStart),
        $lte: new Date(new Date(deliveryEnd).setUTCHours(23, 59, 59, 999)),
      };

      delete query.deliveryStart;
      delete query.deliveryEnd;
    }

    if (query?.status === "status" || !query?.status) {
      delete query.status;
    }
    const orders = await Order.paginate(query);

    return orders;
  },

  getOrderByUser: async function (userId, query) {
    query.userId = userId;
    query.sortBy = "createdAt.desc";

    const { deliveryStart, deliveryEnd } = query;

    if (deliveryStart) {
      query.createdAt = {
        $gte: new Date(deliveryStart),
      };
      delete query.deliveryStart;
    } else if (deliveryStart && deliveryEnd) {
      query.createdAt = {
        $gte: new Date(deliveryStart),
        $lte: new Date(new Date(deliveryEnd).setUTCHours(23, 59, 59, 999)),
      };
      delete query.deliveryStart;
      delete query.deliveryEnd;
    }

    if (query?.status === "status" || !query?.status) {
      delete query.status;
    }
    const order = await Order.paginate(query);

    return order;
  },

  getOrderById: async function (orderId) {
    const order = await Order.findById(orderId);

    if (!orderId) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Order is not found",
        "Get single order"
      );
    }
    return order;
  },

  createOrder: async function (userId, orderBody) {
    const session = await startSession();

    let { cartId } = orderBody;

    cartId = Types.ObjectId(cartId);

    orderBody = { ...orderBody, userId, cartId };

    try {
      session.startTransaction();

      const order = await Order.create([orderBody], { session });

      await CartItem.deleteMany({ cartId }, { session });

      await CartItem.countDocuments({ cartId }, { session });

      const cart = await Cart.findByIdAndUpdate(
        cartId,
        { totalItem: 0 },
        { session }
      );

      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  updateOrderById: async function (orderBody) {
    let { orderIds, status } = orderBody;

    orderIds = orderIds.map((e) => Types.ObjectId(e));

    let order = await Order.find({ _id: { $in: orderIds } });

    if (order.length !== orderIds.length) {
      throw new AppError(404, "Order Not Found", "Update order");
    }

    await Order.updateMany({ _id: { $in: orderIds } }, { status });
  },

  deleteOrderById: async function (orderId) {
    const order = await Order.findByIdAndUpdate(orderId, {
      isDeleted: true,
    });
    if (!order) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Order is not found",
        "Delete single order"
      );
    }
    return order;
  },
};
export default orderService;
