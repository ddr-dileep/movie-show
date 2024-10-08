import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { Movie } from "../models/movie.model";
import { User } from "../models/user.model";
import { Reaction } from "../models/reaction.model";

export const movieContoller = {
  getAllMovies: async (req: Request, res: Response) => {
    try {
      const movies = await Movie.find().select(
        "_id title posterUrl isPublished createdAt"
      );
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
      const movie = await Movie.findById(req.params.id)
        .populate({
          path: "uploadedBy",
          select: "username email role",
        })
        .populate({
          path: "comments",
          select: "user movie content replies createdAt updatedAt",
          populate: {
            path: "user",
            select: "username email",
          },
        })
        .populate({
          path: "reactions",
          select: "user type",
          populate: {
            path: "user",
            select: "username email",
          },
        });
      if (!movie) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Movie not found",
            error_type: "not found",
          })
        );
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

  updateMovie: async (req: Request | any, res: Response): Promise<any> => {
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

      if (!user.movies.includes(req.params.id)) {
        return res.status(403).json(
          API_RESPONSES.error({
            message: "This movie is belonging to another user",
            error_type: "unauthorized",
          })
        );
      }

      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      if (!movie) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Movie not found",
            error_type: "not found",
          })
        );
      }
      res.json(API_RESPONSES.success({ movie }));
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },

  deleteMovie: async (req: Request | any, res: Response): Promise<any> => {
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

      if (!user.movies.includes(req.params.id)) {
        return res.status(403).json(
          API_RESPONSES.error({
            message: "This movie is belonging to another user",
            error_type: "unauthorized",
          })
        );
      }

      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Movie not found",
            error_type: "not found",
          })
        );
      }

      // remove the movie from the user's model
      user?.movies.pull(movie?._id);
      await user.save();

      res.json(
        API_RESPONSES.success({ message: "Movie deleted successfully" })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },

  getMoviesOfUser: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "User not found",
            error_type: "not found",
          })
        );
      }

      const movies = await Movie.find({ uploadedBy: user?._id });

      res.json(
        API_RESPONSES.success({
          count: movies?.length,
          movies,
          message: "Movies featched successfully",
        })
      );
    } catch (error) {
      res.status(500).json(API_RESPONSES.error(error));
    }
  },

  addReaction: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const { movieId } = req.params;
      const { reaction: userReaction } = req.body;

      // Validate reaction type
      if (!["like", "dislike"].includes(userReaction)) {
        return res.status(400).json(
          API_RESPONSES.error({
            message: "Invalid reaction type",
            error_type: "validation",
          })
        );
      }

      // Find the movie and populate its reactions
      const movie: any = await Movie.findById(movieId)
        .populate("reactions")
        .exec();
      if (!movie) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Movie not found",
            error_type: "not found",
          })
        );
      }

      // Find the user making the request
      const user: any = await User.findById(req.user.id).exec();
      if (!user) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized",
            error_type: "unauthorized",
          })
        );
      }

      // Check if the user has already reacted
      const existingReaction: any = movie?.reactions?.find(
        (r: any) => r?.user.toString() === user?._id?.toString()
      );

      if (existingReaction) {
        if (existingReaction.type === userReaction) {
          // If the user is trying to submit the same reaction again, remove the reaction (toggle off)
          movie.reactions = movie.reactions.filter(
            (r: any) => r._id.toString() !== existingReaction._id.toString()
          );
          await Reaction.findByIdAndDelete(existingReaction._id);
        } else {
          // Update the existing reaction if it's different
          existingReaction.type = userReaction;
          await existingReaction.save();
        }
      } else {
        // If no reaction exists, create a new one
        const newReaction = new Reaction({
          user: user._id,
          type: userReaction,
        });
        await newReaction.save();
        movie.reactions.push(newReaction._id);
      }

      // Save the updated movie with reactions
      await movie.save();

      // Respond with a success message
      res.json(API_RESPONSES.success({ message: "Reaction updated", movie }));
    } catch (error) {
      // Handle any errors
      res.status(500).json(API_RESPONSES.error(error));
    }
  },
};
