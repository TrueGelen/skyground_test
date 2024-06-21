import jwt from "jsonwebtoken";
import { GenerateTokensPayloadDTO } from "./dtos/sign-up-user.dto.js";
import { config } from "../../config.js";

class TokenService {
  generateTokens(payload: GenerateTokensPayloadDTO) {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET ?? "", {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, config.JWT_ACCESS_SECRET ?? "", {
      expiresIn: "60s",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
