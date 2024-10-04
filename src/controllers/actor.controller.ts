import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { Actor } from "../models/actor.model";

export const actorContoller = {
  getAllActors: async (req: Request, res: Response): Promise<any> => {
    try {
      const actors = await Actor.find();

      res.status(200).json(
        API_RESPONSES.success({
          count: actors.length,
          actors: actors,
          message: "Actors featched successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },
};
