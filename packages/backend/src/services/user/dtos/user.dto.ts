import { Expose, plainToInstance } from "class-transformer";

export class UserDTO {
  @Expose()
  id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  constructor(params: UserDTO) {
    Object.assign(
      this,
      plainToInstance(UserDTO, params, {
        excludeExtraneousValues: true,
      })
    );
  }
}
