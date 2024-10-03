import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { Movie } from "../models/movie.model";
import { User } from "../models/user.model";

export const movieContoller = {
  getAllMovies: async (req: Request, res: Response) => {
    try {
      const movies = await Movie.find();
      res.json(
        API_RESPONSES.success({
          count: movies?.length,
          movies,
          message: "Movies featched successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  getOneMovie: async (req: Request, res: Response): Promise<any> => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res
          .status(404)
          .json(API_RESPONSES.error({ message: "Movie not found" }));
      }
      res.json(API_RESPONSES.success({ movie }));
    } catch (error) {
      res.status(500).json(API_RESPONSES.error(error));
    }
  },

  createMovie: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req?.user?.id);

      if (!user) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized",
            error_type: "Unauthorized",
          })
        );
      }

      const movie = new Movie({ ...req.body, uploadedBy: user?._id });
      await movie.save();

      // add the movie to the user's model
      user?.movies.push(movie?._id);
      await user.save();

      res.status(201).json(
        API_RESPONSES.success({
          movie,
          message: "Movie created successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },
};
