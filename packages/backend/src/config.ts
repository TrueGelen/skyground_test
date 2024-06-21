import "dotenv/config";

export const config = {
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
};
