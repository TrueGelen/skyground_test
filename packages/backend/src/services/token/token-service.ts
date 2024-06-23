import jwt from "jsonwebtoken";
import { validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";
import { GenerateTokensPayloadDTO } from "./dtos/generate-tokens-payload.dto.js";
import { config } from "../../config.js";
import { ApiError } from "../../exceptions/api-errors.js";
import { UserDTO } from "../user/dtos/user.dto.js";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class TokenService {
  generateTokens(payload: GenerateTokensPayloadDTO): Tokens {
    const accessToken = jwt.sign(
      { ...payload },
      config.JWT_ACCESS_SECRET ?? "",
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { ...payload },
      config.JWT_REFRESH_SECRET ?? "",
      {
        expiresIn: "30d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  tryToGetUserOrFail({
    accessToken = "",
    refreshToken = "",
  }: Partial<Tokens>): {
    user: UserDTO;
    tokens?: Tokens;
  } {
    let user: UserDTO | null = null;
    let tokens: Tokens | undefined = undefined;

    jwt.verify(accessToken, config.JWT_ACCESS_SECRET ?? "", (err, curUser) => {
      if (err != null) {
        if (err.name === "TokenExpiredError") {
          const result = this.tryToGetUserAndTokensByRefreshToken(refreshToken);

          user = result.user;
          tokens = result.tokens;

          return;
        }

        throw ApiError.UnauthorizedError();
      }

      const userDto = plainToInstance(UserDTO, curUser, {
        excludeExtraneousValues: true,
      });

      const validationErrors = validateSync(userDto);

      if (validationErrors.length > 0) {
        throw ApiError.UnauthorizedError();
      }

      user = userDto;
    });

    if (user == null) {
      throw ApiError.UnauthorizedError();
    }

    return { user, tokens };
  }

  private tryToGetUserAndTokensByRefreshToken(refreshToken: string): {
    user: UserDTO;
    tokens: Tokens;
  } {
    let user: UserDTO | null = null;
    let tokens: Tokens | null = null;

    jwt.verify(
      refreshToken,
      config.JWT_REFRESH_SECRET ?? "",
      (verifyError, curUser = {}) => {
        const userDto = plainToInstance(UserDTO, curUser, {
          excludeExtraneousValues: true,
        });

        if (
          verifyError != null ||
          curUser == null ||
          validateSync(userDto).length > 0
        ) {
          throw ApiError.UnauthorizedError();
        }

        user = userDto;
        tokens = this.generateTokens(userDto);
      }
    );

    if (user == null || tokens == null) {
      throw ApiError.UnauthorizedError();
    }

    return { user, tokens };
  }
}

export const tokenService = new TokenService();
