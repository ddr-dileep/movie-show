import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { Actor } from "../models/actor.model";

export const actorContoller = {
  getAllActors: async (req: Request, res: Response): Promise<any> => {
    try {
      const filters: any = req.query;

      // Build dynamic query object for filtering actors
      const query: any = {};

      // filtering based on the available query params
      if (filters.name) {
        query.name = { $regex: filters.name, $options: "i" }; // Case-insensitive search for name
      }
      if (filters.gender) {
        query.gender = filters.gender;
      }
      if (filters.nationality) {
        query.nationality = filters.nationality;
      }
      if (filters.occupation) {
        query.occupation = { $regex: filters.occupation, $options: "i" };
      }
      if (filters.birthdate) {
        query.birthdate = { $gte: new Date(filters.birthdate) };
      }
      if (filters.height) {
        query.height = { $gte: Number(filters.height) };
      }

      // Add more filters as needed, like awards, spouse, movies, etc.
      if (filters.movies) {
        query.movies = { $in: filters.movies.split(",") }; // Search for actors in any of the given movies
      }

      const actors = await Actor.find(query); // Get all actors based on the query/all

      res.status(200).json(
        API_RESPONSES.success({
          count: actors.length,
          actors: actors,
          message: "Actors fetched successfully",
        })
      );
    } catch (error) {
      res.status(500).json(API_RESPONSES.error(error));
    }
  },

  getActorById: async (req: Request, res: Response): Promise<any> => {
    try {
      const actor = await Actor.findById(req?.params?.actorId);
      if (!actor) {
        return res
          .status(404)
          .json(API_RESPONSES.error({ message: "Actor not found" }));
      }

      res.status(200).json(
        API_RESPONSES.success({
          actor,
          message: "Actor fetched successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  createActor: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const createdBy = req?.user?.id;
      const actor = new Actor({ ...req.body, createdBy });

      await actor.save();

      res.status(201).json(API_RESPONSES.success({ actor }));
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },
  updateActor: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const actor: any = await Actor.findById(req.params.actorId);

      if (!actor) {
        return res
          .status(404)
          .json(API_RESPONSES.error({ message: "Actor not found" }));
      }

      // update the actor if it created by the same createBy key or user
      if (actor.createdBy.toString() !== req.user?.id) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized to update actor",
            error_type: "authentication error",
          })
        );
      }

      await Actor.findByIdAndUpdate(actor._id, req.body, { new: true });
      res.status(200).json(
        API_RESPONSES.success({
          actor,
          message: "Actor updated successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },
};
