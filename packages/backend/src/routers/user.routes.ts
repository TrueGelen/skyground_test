import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.post("/signup", userController.signUp);
userRoutes.post("/signin", userController.signIn);
userRoutes.post("/signout", userController.signOut);
userRoutes.get("/users", userController.getUsers);
