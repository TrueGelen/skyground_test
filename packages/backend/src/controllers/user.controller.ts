import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { userService } from "../services/user/user.service.js";
import { CreateUserDto } from "../services/user/dtos/sign-up-user.dto.js";
import { ApiError } from "../exceptions/api-errors.js";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = plainToClass(CreateUserDto, req.body);
      const errors = await validate(userDto);

      if (errors.length > 0) {
        return next(ApiError.ValidationError({ errors }));
      }
      const user = await userService.signUp(userDto);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(user);
    } catch (e) {
      console.log("UserController > signUp > errors", e);
      return next(e);
    }
  }
  async signIn(req: Request, res: Response) {}
  async signOut(req: Request, res: Response) {}
  async getUsers(req: Request, res: Response) {
    return res.json(await userService.getUsers());
  }
}

export const userController = new UserController();
