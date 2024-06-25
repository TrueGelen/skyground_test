import jwt from "jsonwebtoken";
import { validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";
import { GenerateTokensPayloadDTO } from "./dtos/generate-tokens-payload.dto.js";
import { envConfig } from "../../envConfig.js";
import { ApiError } from "../../exceptions/api-errors.js";
import { UserDTO } from "../user/dtos/user.dto.js";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class TokenService {
  generateTokens(payload: GenerateTokensPayloadDTO): Tokens {
    const accessToken = jwt.sign({ ...payload }, envConfig.JWT_ACCESS_SECRET, {
      // expiresIn: "15m",
      expiresIn: "15s",
    });

    const refreshToken = jwt.sign(
      { ...payload },
      envConfig.JWT_REFRESH_SECRET,
      {
        // expiresIn: "30d",
        expiresIn: "30s",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async tryToGetUserAndTokens({
    accessToken,
    refreshToken,
  }: Partial<Tokens>): Promise<{
    user: UserDTO;
    tokens?: Tokens;
  }> {
    try {
      const user = await this.verifyAccessToken(accessToken);

      return { user };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return await this.verifyRefreshToken(refreshToken);
      }
    }

    throw ApiError.UnauthorizedError();
  }

  private async verifyAccessToken(
    accessToken: string | null | undefined
  ): Promise<UserDTO> {
    return new Promise<UserDTO>((resolve, reject) => {
      if (accessToken == null) {
        return reject(ApiError.UnauthorizedError());
      }

      jwt.verify(
        accessToken,
        envConfig.JWT_ACCESS_SECRET,
        async (err, curUser) => {
          if (err != null) {
            return reject(err);
          }

          const userDto = plainToInstance(UserDTO, curUser, {
            excludeExtraneousValues: true,
          });

          const validationErrors = validateSync(userDto);

          if (validationErrors.length > 0) {
            return reject(ApiError.UnauthorizedError());
          }

          return resolve(userDto);
        }
      );
    });
  }

  private async verifyRefreshToken(
    refreshToken: string | null | undefined
  ): Promise<{
    user: UserDTO;
    tokens: Tokens;
  }> {
    return new Promise((resolve, reject) => {
      if (refreshToken == null) {
        return reject(ApiError.UnauthorizedError());
      }

      jwt.verify(
        refreshToken,
        envConfig.JWT_REFRESH_SECRET,
        (err, curUser = {}) => {
          const userDto = plainToInstance(UserDTO, curUser, {
            excludeExtraneousValues: true,
          });

          if (
            err != null ||
            curUser == null ||
            validateSync(userDto).length > 0
          ) {
            return reject(ApiError.UnauthorizedError());
          }

          return resolve({
            user: userDto,
            tokens: this.generateTokens(userDto),
          });
        }
      );
    });
  }
}

export const tokenService = new TokenService();
