// createMovie

import { NextFunction, Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";

export const movieMiddleware = {
  createMovie: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { title, description, movieUrl, posterUrl } = req.body;

    if (!title || !description || !movieUrl || !posterUrl) {
      return res.status(400).json(
        API_RESPONSES.error({
          title: title ? undefined : "title is required",
          description: description ? undefined : "description is required",
          movieUrl: movieUrl ? undefined : "movie is required",
          posterUrl: posterUrl ? undefined : "poster is required",
          message: "All Fields are required",
          error_type: "Validation Error",
        })
      );
    }

    next();
  },
};
