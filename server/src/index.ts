import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./database";

import cors from "cors";
import Grouter from "./routes";

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return res
    .json({
      message: "Hello World",
    })
    .status(200);
});
app.use("/api/v1", Grouter);
ConnectDB();
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
