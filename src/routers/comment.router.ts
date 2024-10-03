import { Router } from "express";
import { commentContoller } from "../controllers/comment.controllers";
import { commentMiddleware } from "../middlewares/comment.middleware";
import { authTokenMiddleware } from "../utils/token";

const commentRouter = Router();

commentRouter.get("/get-all/:movieId", commentContoller.getAllCommentOfMovie);

commentRouter.post(
  "/add-comment",
  commentMiddleware.addComment,
  authTokenMiddleware,
  commentContoller.addComment
);

commentRouter.post(
  "/add-reply/:commentId",
  commentMiddleware.addCommentReply,
  authTokenMiddleware,
  commentContoller.addReplyToComment
);

export default commentRouter;
