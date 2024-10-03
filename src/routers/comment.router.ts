import { Router } from "express";
import { commentContoller } from "../controllers/comment.controllers";

const commentRouter = Router();

commentRouter.get("/get-all/:id", commentContoller.getAllCommentOfMovie);

export default commentRouter;
