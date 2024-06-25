import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { userService } from "../services/user/user.service.js";
import { SignUpUserPayloadDTO } from "../services/user/dtos/sign-up-user-payload.dto.js";
import { ApiError } from "../exceptions/api-errors.js";
import { SignIpUserPayloadDTO } from "../services/user/dtos/sign-in-user-payload.dto.js";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const signUpUserPayload = new SignUpUserPayloadDTO(req.body);
      const errors = await validate(signUpUserPayload);

      if (errors.length > 0) {
        return next(ApiError.ValidationError({ errors }));
      }

      const { user, tokens } = await userService.signUp(signUpUserPayload);

      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
      });

      return res.json(user);
    } catch (e) {
      return next(e);
    }
  }

  async signIn(
    req: Request<{ email: string; password: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const signInUserPayload = new SignIpUserPayloadDTO(req.body);
      const errors = await validate(signInUserPayload);

      if (errors.length > 0) {
        return next(ApiError.ValidationError({ errors }));
      }

      const user = await userService.signIn(signInUserPayload);

      res.cookie("accessToken", user.accessToken, {
        httpOnly: true,
      });

      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
      });

      return res.json(user.user);
    } catch (e) {
      return next(e);
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const me = req.user;

      if (me == null) {
        throw ApiError.UnauthorizedError();
      }

      res.json(me);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await userService.getUsers());
    } catch (e) {
      return next(e);
    }
  }
}

export const userController = new UserController();
