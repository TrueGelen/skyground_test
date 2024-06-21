import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
  url: config.DATABASE_URL,
});
