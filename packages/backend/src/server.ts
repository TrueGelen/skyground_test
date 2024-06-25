import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./routers/user.routes.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import { envConfig } from "./envConfig.js";
import { AppDataSource } from "./data-source.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: envConfig.CLIENT_URL,
  })
);
app.use("/", userRoutes);
app.use(errorMiddleware);

AppDataSource.initialize()
  .then(async () => {
    app.listen(envConfig.PORT, () => {
      console.log(`Server is running on PROT = ${envConfig.PORT}`);
    });

    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.error(error));
