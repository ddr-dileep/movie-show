import { Router } from "express";
import { commentContoller } from "../controllers/comment.controllers";
import { commentMiddleware } from "../middlewares/comment.middleware";
import { authTokenMiddleware } from "../utils/token";

const commentRouter = Router();

commentRouter.get("/get-all/:movieId", commentContoller.getAllCommentOfMovie);
commentRouter.get("/get-one/:commentId", commentContoller.getOneComment);

commentRouter.post(
  "/add",
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

commentRouter.patch(
  "/update/:commentId",
  commentMiddleware.updateComment,
  authTokenMiddleware,
  commentContoller.updateComment
);

commentRouter.delete(
  "/delete/:commentId",
  authTokenMiddleware,
  commentContoller.deleteComment
);

export default commentRouter;
