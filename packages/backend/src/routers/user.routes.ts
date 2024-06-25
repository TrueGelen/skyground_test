import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

export const userRoutes = Router();

userRoutes.post("/sign-up", userController.signUp);
userRoutes.post("/sign-in", userController.signIn);
userRoutes.post("/sign-out", userController.signOut);
userRoutes.get("/users", authMiddleware, userController.getUsers);
userRoutes.get("/me", authMiddleware, userController.me);
