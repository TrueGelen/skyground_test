import "dotenv/config";
import { IsNumber, IsString, IsNotEmpty, validateSync } from "class-validator";
import { plainToInstance, instanceToPlain } from "class-transformer";

class ENVConfig {
  @IsNumber()
  PORT!: string;

  @IsString()
  @IsNotEmpty()
  CLIENT_URL!: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;
}

export const envConfig = getConfig() as InstanceType<typeof ENVConfig>;

function getConfig() {
  try {
    const envConfig = plainToInstance(ENVConfig, {
      PORT: Number(process.env.PORT) ?? 8080,
      CLIENT_URL: process.env.CLIENT_URL,
      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
    });

    const errors = validateSync(envConfig);

    if (errors.length > 0) {
      throw errors;
    }

    return instanceToPlain(envConfig) as InstanceType<typeof ENVConfig>;
  } catch (error) {
    console.error(error);
  }
}
