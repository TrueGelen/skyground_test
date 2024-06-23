import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source.js";
import { User } from "../../entities/user.entity.js";
import { ApiError } from "../../exceptions/api-errors.js";
import { GenerateTokensPayloadDTO } from "../token/dtos/sign-up-user.dto.js";
import { tokenService } from "../token/token-service.js";
import { CreateUserDto } from "./dtos/sign-up-user.dto.js";
import { SignInUserDto } from "./dtos/sign-in-user.dto.js";

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async signUp(userData: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (candidate != null) {
      throw ApiError.ValidationError({
        message: "Such an email already exists.",
        errors: [
          {
            property: "email",
            constraints: { message: "Such an email already exists." },
          },
        ],
      });
    }

    const hashPassword = await bcrypt.hash(userData.password, 3);
    const user = await this.userRepository.save({
      ...userData,
      password: hashPassword,
    });
    const generateTokenPayloadDto = new GenerateTokensPayloadDTO(user);
    const tokens = tokenService.generateTokens({ ...generateTokenPayloadDto });

    return { user: generateTokenPayloadDto, ...tokens };
  }

  async signIn(userData: SignInUserDto) {
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

    const generateTokenPayloadDto = new GenerateTokensPayloadDTO(user);
    const tokens = tokenService.generateTokens({ ...generateTokenPayloadDto });

    return { user: generateTokenPayloadDto, ...tokens };
  }

  async signOut() {}

  async getUsers() {
    return new Promise((resolve) =>
      resolve([
        {
          id: "0",
          email: "some@ya.ru",
          firstName: "Ivan",
          lastName: "Ivanov",
        },
      ])
    );
  }
}

export const userService = new UserService();
