import { Router } from "express";
import { movieContoller } from "../controllers/movie.controllers";
import { movieMiddleware } from "../middlewares/movie.middleware";
import { authTokenMiddleware } from "../utils/token";

const movieRouter = Router();

movieRouter.get("/get-all", movieContoller.getAllMovies);
movieRouter.get("/get-one/:id", movieContoller.getOneMovie);

movieRouter.post(
  "/create",
  movieMiddleware.createMovie,
  authTokenMiddleware,
  movieContoller.createMovie
);

movieRouter.patch(
  "/update/:id",
  authTokenMiddleware,
  movieContoller.updateMovie
);

movieRouter.delete(
  "/delete/:id",
  authTokenMiddleware,
  movieContoller.deleteMovie
);

movieRouter.get("/my-movies", authTokenMiddleware, movieContoller.getMoviesOfUser);

export default movieRouter;
