import { Expose, plainToInstance } from "class-transformer";

export class GenerateTokensPayloadDTO {
  @Expose()
  id!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  constructor(params: GenerateTokensPayloadDTO) {
    Object.assign(
      this,
      plainToInstance(GenerateTokensPayloadDTO, params, {
        excludeExtraneousValues: true,
      })
    );
  }
}
