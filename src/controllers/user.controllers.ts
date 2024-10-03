import { Request, Response } from "express";
import { API_RESPONSES } from "../utils/api.response";
import { User } from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/token";

export const userContoller = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(
        API_RESPONSES.success({
          count: users.length,
          users,
          message: "User featched successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void | any> => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "User not found",
            error_type: "invalid details",
          })
        );
      }

      res.status(200).json(
        API_RESPONSES.success({
          user,
          message: "User featched successfully",
        })
      );
    } catch (error) {
      res.status(404).json(API_RESPONSES.error(error));
    }
  },

  registerUser: async (req: Request, res: Response) => {
    try {
      const user = await User.create({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      res.json(
        API_RESPONSES.success({
          user: { ...user, password: undefined },
          message: "User created successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },

  loginUser: async (
    req: Request,
    res: Response
  ): Promise<undefined | void | any> => {
    try {
      const user: any = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "User not found",
            error_type: "authentication error",
          })
        );
      }

      const passwordMatch = await verifyPassword(
        req.body.password,
        user?.password
      );

      if (!passwordMatch) {
        return res.status(401).json(
          API_RESPONSES.error({
            message: "Invalid creadientials",
            error_type: "authentication error",
          })
        );
      }

      const token = generateToken({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      res.json(
        API_RESPONSES.success({
          token: token?.split("").reverse().join(""),
          message: "User logged in successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },

  getUserInfo: async (
    req: Request | any,
    res: Response
  ): Promise<undefined | void | any> => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "User not found",
            error_type: "invalid details",
          })
        );
      }

      res.json(
        API_RESPONSES.success({
          user,
          message: "User fetched successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },

  updateUser: async (
    req: Request | any,
    res: Response
  ): Promise<undefined | void | any> => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "User not found",
            error_type: "invalid details",
          })
        );
      }
      res.json(
        API_RESPONSES.success({
          user,
          message: "User updated successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },

  deleteUser: async (
    req: Request | any,
    res: Response
  ): Promise<undefined | void | any> => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) {
        return res.status(404).json(
          API_RESPONSES.error({
            message: "User not found",
            error_type: "invalid details",
          })
        );
      }
      res.json(
        API_RESPONSES.success({
          user,
          message: "User deleted successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSES.error(error));
    }
  },
};
