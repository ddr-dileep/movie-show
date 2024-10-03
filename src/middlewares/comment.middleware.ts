import { NextFunction, Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";

export const commentMiddleware = {
  addComment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { content, movie } = req.body;

    if (!content || !movie) {
      return res.status(400).json(
        API_RESPONSES.error({
          content: content ? undefined : "content is required",
          movie: movie ? undefined : "movieId is required",
          error_type: "Validation Error",
          message: "All Fields are required",
        })
      );
    }

    next();
  },

  addCommentReply: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { content } = req.body;
    const { commentId } = req.params;

    if (!content || !commentId) {
      return res.status(400).json(
        API_RESPONSES.error({
          content: content ? undefined : "content is required",
          commentId: commentId ? undefined : "commentId is required",
          error_type: "Validation Error",
          message: "All Fields are required",
        })
      );
    }

    next();
  },

  updateComment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { content } = req.body;
    const { commentId } = req.params;
    
    if (!content || !commentId) {
      return res.status(400).json(
        API_RESPONSES.error({
          content: content ? undefined : "content is required",
          commentId: commentId ? undefined : "commentId is required",
          error_type: "Validation Error",
          message: "All Fields are required",
        })
      );
    }

    next();
  },
};
