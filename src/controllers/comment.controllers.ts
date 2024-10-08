import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { Comment } from "../models/comment.model";
import { Movie } from "../models/movie.model";
import { User } from "../models/user.model";

export const commentContoller = {
  getAllCommentOfMovie: async (req: Request, res: Response): Promise<any> => {
    try {
      const movie = await Movie.findById(req.params.movieId);
      if (!movie) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Movie not found or deleted",
            error_type: "not found",
          })
        );
      }

      const comments = await Comment.find({ movie: req.params?.movieId });
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

  getOneComment: async (req: Request, res: Response): Promise<any> => {
    try {
      const comment = await Comment.findById(req.params?.commentId);
      if (!comment) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Comment not found or deleted",
            error_type: "not found",
          })
        );
      }
      res.json(
        API_RESPONSES.success({
          comment,
          message: "Comment fetched successfully",
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

  addReplyToComment: async (
    req: Request | any,
    res: Response
  ): Promise<any> => {
    try {
      const user = await User.findById(req.user?.id);
      if (!user) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized to add comment",
            error_type: "authentication error",
          })
        );
      }

      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Comment not found or deleted",
            error_type: "not found",
          })
        );
      }

      const reply = {
        user: user?.id,
        content: req.body.content,
        createdAt: new Date(),
      };

      comment.replies.push(reply);
      await comment.save();

      res.json(
        API_RESPONSES.success({
          comment,
          message: "Comment's reply added successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  updateComment: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Comment not found or deleted",
            error_type: "not found",
          })
        );
      }

      if (comment.user.toString() !== req.user?.id.toString()) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized to update comment",
            error_type: "authentication error",
          })
        );
      }

      comment.content = req.body.content;
      console.log("comment updated", comment);
      await comment.save();

      res.json(
        API_RESPONSES.success({
          comment,
          message: "Comment updated successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  deleteComment: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const comment: any = await Comment.findById(req.params.commentId);
      if (!comment) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Comment not found or deleted",
            error_type: "not found",
          })
        );
      }

      if (comment.user.toString() !== req.user?.id.toString()) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized to delete comment",
            error_type: "authentication error",
          })
        );
      }

      await Comment.findByIdAndDelete(req.params.commentId);
      await Movie.findByIdAndUpdate(
        comment.movie,
        { $pull: { comments: comment._id } },
        { new: true }
      );

      res.json(
        API_RESPONSES.success({
          message: "Comment deleted successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  updateReplyOfComment: async (
    req: Request | any,
    res: Response
  ): Promise<any> => {
    try {
      const { content, replyId } = req.body;
      const { commentId } = req.params;

      const comment: any = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Comment not found or deleted",
            error_type: "not found",
          })
        );
      }

      const replyIndex = comment?.replies?.findIndex(
        (reply: any) => reply?._id?.toString() === replyId.toString()
      );
      if (replyIndex === -1) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Reply not found or deleted",
            error_type: "not found",
          })
        );
      }

      if (
        comment.replies[replyIndex].user.toString() !== req.user?.id.toString()
      ) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized to update reply",
            error_type: "authentication error",
          })
        );
      }

      comment.replies[replyIndex].content = content;
      await comment.save();
      res.json(
        API_RESPONSES.success({
          comment,
          message: "Reply updated successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  deleteReplyOfComment: async (
    req: Request | any,
    res: Response
  ): Promise<any> => {
    try {
      const { replyId } = req.body;
      const { commentId } = req.params;

      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Comment not found or deleted",
            error_type: "not found",
          })
        );
      }

      const replyIndex = comment?.replies?.findIndex(
        (reply: any) => reply?._id?.toString() === replyId.toString()
      );

      if (replyIndex === -1) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "Reply not found or deleted",
            error_type: "not found",
          })
        );
      }

      if (
        comment.replies[replyIndex].user.toString() !== req.user?.id.toString()
      ) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Unauthorized to delete reply",
            error_type: "authentication error",
          })
        );
      }

      comment.replies.splice(replyIndex, 1);
      await comment.save();

      res.json(
        API_RESPONSES.success({
          comment,
          message: "Reply deleted successfully",
        })
      );
    } catch (error) {
      console.error("Error deleting reply:", error);
      res.status(500).json(
        API_RESPONSES.error({
          message: "An error occurred while deleting the reply",
          error_type: "internal server error",
        })
      );
    }
  },
};
