import { Expose, plainToInstance } from "class-transformer";

export class SignIpUserPayloadDTO {
  @Expose()
  email!: string;

  @Expose()
  password!: string;

  constructor(params: SignIpUserPayloadDTO) {
    Object.assign(
      this,
      plainToInstance(SignIpUserPayloadDTO, params, {
        excludeExtraneousValues: true,
      })
    );
  }
}
