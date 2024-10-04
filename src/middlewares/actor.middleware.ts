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

  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { name, image, birthdate, gender } = req.body;

    if (!name || !image || !birthdate || !gender) {
      return res.status(400).json(
        API_RESPONSES.error({
          name: name ? undefined : "name is required",
          image: image ? undefined : "image is required",
          birthdate: birthdate ? undefined : "birthdate is required",
          gender: gender ? undefined : "gender is required",
          message: "All Fields are required",
          error_type: "validation error",
        })
      );
    }

    next();
  },
};
