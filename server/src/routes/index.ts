import { Router } from "express";
import {
  createUser,
  getProfile,
  updateAbout,
  updatePicture,
} from "../controllers";

const Grouter = Router();

Grouter.post("/create/user", createUser);
Grouter.get("/user/profile/:email", getProfile);
Grouter.post("/user/update/profile/photo/:email", updatePicture);
Grouter.put("/user/update/profile/about/:email", updateAbout);

export default Grouter;
