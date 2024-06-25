import { NextFunction, Request, Response } from "express";
import { tokenService } from "../services/token/token-service.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    const { user, tokens } = await tokenService.tryToGetUserAndTokens({
      accessToken,
      refreshToken,
    });

    if (tokens != null) {
      res.cookie("accessToken", tokens.accessToken, { httpOnly: true });
      res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
}
