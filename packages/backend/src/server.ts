import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./routers/user.routes.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import { config } from "./config.js";
import { AppDataSource } from "./data-source.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: config.CLIENT_URL,
  })
);

const PORT = process.env.PORT ?? 8080;

app.use("/", userRoutes);
app.use(errorMiddleware);
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on PROT = ${PORT}`);
    });

    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
