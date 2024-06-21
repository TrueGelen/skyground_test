export class GenerateTokensPayloadDTO {
  firstName!: string;
  lastName!: string;
  email!: string;

  constructor(params: GenerateTokensPayloadDTO) {
    Object.assign(this, params);
  }
}
