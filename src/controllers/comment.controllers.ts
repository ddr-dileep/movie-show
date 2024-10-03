import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { Comment } from "../models/comment.model";
import { Movie } from "../models/movie.model";

export const commentContoller = {
  getAllCommentOfMovie: async (req: Request, res: Response): Promise<any> => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Movie not found or deleted",
            error_type: "not found",
          })
        );
      }

      const comments = await Comment.find({ movie: req.params?.id });
      res.json(
        API_RESPONSES.success({
          comments,
          message: "Comments of movie fetched successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },
};
