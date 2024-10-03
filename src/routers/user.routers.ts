import { Router } from "express";
import { userContoller } from "../controllers/user.controllers";
import { userMiddleware } from "../middlewares/user.middleware";
import { authTokenMiddleware } from "../utils/token";

const userRouters = Router();

userRouters.get("/get-all", userContoller.getAllUsers);
userRouters.get("/get-one/:id", userContoller.getUserById);

userRouters.post("/register", userMiddleware.register, userContoller.registerUser);
userRouters.post("/login", userMiddleware.login, userContoller.loginUser);

userRouters.get("/get-info", authTokenMiddleware, userContoller.getUserInfo);

userRouters.patch("/update", authTokenMiddleware, userContoller.updateUser);
userRouters.delete("/delete", authTokenMiddleware, userContoller.deleteUser);

export default userRouters;
