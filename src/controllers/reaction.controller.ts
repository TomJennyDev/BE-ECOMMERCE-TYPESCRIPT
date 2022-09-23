import { NextFunction, Request, Response } from "express";

const reactionController = {
  getReaction: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const reactions = await reactionService.getAllReactions(req.query);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        reactions,
        "",
        "Get Reactions successfully"
      );
    }
  ),

  createReaction: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.user;

      const reaction = await reactionService.createReaction(id, req.body);
      return sendResponse(
        res,
        StatusCodes.OK,
        true,
        reaction,
        "",
        "Create Reaction successfully"
      );
    }
  ),
};
export default reactionController;
