import "reflect-metadata";
import { DataSource } from "typeorm";
import { envConfig } from "./envConfig.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
  url: envConfig.DATABASE_URL,
});
