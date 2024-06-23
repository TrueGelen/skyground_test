import { Expose, plainToInstance } from "class-transformer";
import { IsString, IsEmail, MinLength, Matches } from "class-validator";

export class SignUpUserPayloadDTO {
  @IsString()
  @MinLength(3)
  @Expose()
  firstName!: string;

  @IsString()
  @MinLength(3)
  @Expose()
  lastName!: string;

  @IsEmail()
  @Expose()
  email!: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, {
    message: "Password must contain at least one letter and one number",
  })
  @Expose()
  password!: string;

  constructor(params: SignUpUserPayloadDTO) {
    Object.assign(
      this,
      plainToInstance(SignUpUserPayloadDTO, params, {
        excludeExtraneousValues: true,
      })
    );
  }
}
