import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { API_RESPONSES } from "./api.response";

export const generateToken = (data: Object): string => {
  return JWT.sign(data, process.env.TOKEN_SECRET_KEY!, { expiresIn: "2d" });
};

export const authTokenMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers["authorization"]
    ?.split(" ")[1]
    ?.split("")
    .reverse()
    .join("");
    
  if (!token) {
    return res.status(401).json(
      API_RESPONSES.error({
        meesage: "Token not found",
        error_type: "authentication error",
      })
    );
  }

  try {
    const decoded = JWT.verify(token, process.env.TOKEN_SECRET_KEY!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(
      API_RESPONSES.error({
        message: "Invalid token",
        error_type: "authentication error",
      })
    );
  }
};
