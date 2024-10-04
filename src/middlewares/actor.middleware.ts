import { NextFunction, Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";

export const actorMiddleware = {
  getOneActorBtId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { actorId } = req.params;

    if (!actorId) {
      return res.status(400).json(
        API_RESPONSES.error({
          message: "Invalid actor ID parameter",
          error_type: "invalid details",
        })
      );
    }

    next();
  },
};
