import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

export const userRoutes = Router();

userRoutes.post("/signup", userController.signUp);
userRoutes.post("/signin", userController.signIn);
userRoutes.post("/signout", userController.signOut);
userRoutes.get("/users", authMiddleware, userController.getUsers);
userRoutes.get("/me", authMiddleware, userController.me);
