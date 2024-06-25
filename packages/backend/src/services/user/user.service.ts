import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source.js";
import { User } from "../../entities/user.entity.js";
import { ApiError } from "../../exceptions/api-errors.js";
import { tokenService } from "../token/token-service.js";
import { UserDTO } from "./dtos/user.dto.js";
import { GenerateTokensPayloadDTO } from "../token/dtos/generate-tokens-payload.dto.js";
import { SignIpUserPayloadDTO } from "./dtos/sign-in-user-payload.dto.js";
import { SignUpUserPayloadDTO } from "./dtos/sign-up-user-payload.dto.js";

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async signUp(userData: SignUpUserPayloadDTO) {
    const candidate = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (candidate != null) {
      throw ApiError.ValidationError({
        message: "A user with this email already exists.",
        errors: [
          {
            property: "email",
            constraints: { message: "A user with this email already exists." },
          },
        ],
      });
    }

    const hashPassword = await bcrypt.hash(userData.password, 3);
    const user = await this.userRepository.save({
      ...userData,
      password: hashPassword,
    });

    const tokens = tokenService.generateTokens(
      new GenerateTokensPayloadDTO(user)
    );

    return { user: new UserDTO(user), tokens: tokens };
  }

  async signIn(userData: SignIpUserPayloadDTO) {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (user == null) {
      throw ApiError.ValidationError({
        message: "There is no user with this email address.",
        errors: [
          {
            property: "email",
            constraints: {
              message: "There is no user with this email address.",
            },
          },
        ],
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw ApiError.BadRequest({
        message: "There is no user with this username and password.",
      });
    }

    const tokens = tokenService.generateTokens(
      new GenerateTokensPayloadDTO(user)
    );

    return { user: new UserDTO(user), ...tokens };
  }

  async getUsers() {
    const users = await this.userRepository.find();

    const dtos = users.map((user) => new UserDTO(user));

    return dtos;
  }
}

export const userService = new UserService();
