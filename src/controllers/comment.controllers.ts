import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { Comment } from "../models/comment.model";
import { Movie } from "../models/movie.model";
import { User } from "../models/user.model";

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

  addComment: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const movie = await Movie.findById(req.body.movie);
      if (!movie) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Movie not found or deleted",
            error_type: "not found",
          })
        );
      }

      const user = await User.findById(req.user?.id);
      if (!user) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized to add comment",
            error_type: "authentication error",
          })
        );
      }

      const comment: any = new Comment({
        content: req.body.content,
        user: user?._id,
        movie: movie?._id,
      });
      await comment.save();

      movie.comments.push(comment?._id);
      await movie.save();

      res.json(
        API_RESPONSES.success({
          comment,
          message: "Comment added successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },
};
