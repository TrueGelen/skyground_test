import express from "express";
import "dotenv/config";
import { userRoutes } from "./routers/user.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

const PORT = process.env.PORT ?? 8080;

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PROT = ${PORT}`);
});
