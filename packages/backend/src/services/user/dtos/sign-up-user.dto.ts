import { IsString, IsEmail, MinLength, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  firstName!: string;

  @IsString()
  @MinLength(3)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, {
    message: "Password must contain at least one letter and one number",
  })
  password!: string;
}
