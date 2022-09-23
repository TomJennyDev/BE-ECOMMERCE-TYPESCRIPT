import { NextFunction, Request, Response } from "express";
import orderService from "../services/order.service";
const orderController = {
  getAllOrders: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const orders = await orderService.getAllOrders(req.query);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        orders,
        "",
        "Get Orders successfully"
      );
    }
  ),

  getOrderByUser: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId } = req.user;
      const order = await orderService.getOrderByUser(userId, req.query);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        order,
        "",
        "get Order successfully"
      );
    }
  ),

  getOrderById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        order,
        "",
        "get Order successfully"
      );
    }
  ),

  createOrder: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: userId } = req.user;
      const order = await orderService.createOrder(userId, req.body);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        order,
        "",
        "Create Order successfully"
      );
    }
  ),

  updateOrderById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const order = await orderService.updateOrderById(req.body);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        order,
        "",
        "Update Order successfully"
      );
    }
  ),

  deleteOrderById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      await orderService.deleteOrderById(id);

      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        {},
        "",
        "Delete order successfully"
      );
    }
  ),
};
export default orderController;
