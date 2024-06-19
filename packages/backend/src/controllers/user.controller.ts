import { Request, Response } from "express";
import { userService } from "../services/user.service.js";

class UserController {
  async signUp(req: Request, res: Response) {
    const { body } = req;
    console.log("signUp -> body1", body);
    return userService.signUp();
  }
  async signIn(req: Request, res: Response) {}
  async signOut(req: Request, res: Response) {}
  async getUsers(req: Request, res: Response) {
    return res.json(await userService.getUsers());
  }
}

export const userController = new UserController();
