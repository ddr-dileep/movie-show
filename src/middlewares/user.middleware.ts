import { NextFunction, Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";

export const userMiddleware = {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json(
        API_RESPONSES.error({
          username: username ? undefined : "username is required",
          email: email ? undefined : "email is required",
          password: password ? undefined : "password is required",
          message: "All Fields are required",
          error_type: "Validation Error",
        })
      );
    }

    next();
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        API_RESPONSES.error({
          email: email ? undefined : "email is required",
          password: password ? undefined : "password is required",
          error_type: "Validation Error",
          message: "All Fields are required",
        })
      );
    }

    next();
  },
};
