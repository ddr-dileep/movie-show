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
};
