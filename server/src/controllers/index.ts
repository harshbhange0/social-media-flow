import { Request, Response } from "express";
import UserZodSchema from "../types";
import User from "../models";

export async function createUser(req: Request, res: Response) {
  const out = UserZodSchema.safeParse(req.body);
  if (!out.success) {
    return res.status(402).json({ message: "unable to pars input" });
  }
  try {
    const { email, photoUrl } = out.data;
    const ex = await User.findOne({ email });
    if (ex) {
      return res.status(200).json({ message: "user Logged in" });
    }
    const newUser = await User.create({ email, photoUrl });
    if (!newUser?._id) {
      return res.status(404).json({ message: "Unable to Create user" });
    }
    return res.status(200).json({ message: "user Registered" });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "something went wong In create user" });
  }
}
export async function getProfile(req: Request, res: Response) {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email });
    if (!user?._id) {
      return res.status(404).json({ message: "No user Found" });
    }
    return res.status(200).json({ message: "user Found", user });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "something went wong In getProfile" });
  }
}

export async function updatePicture(req: Request, res: Response) {
  const { email } = req.params;
  const { photoUrl } = req.body;
  try {
    const update = await User.findOneAndUpdate(
      { email },
      { photoUrl },
      {
        new: true,
      }
    );
    if (!update) {
      return res.status(400).json({ message: "Unable to update Photo" });
    }
    console.log(update);

    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "something went wong In updatePicture" });
  }
}

export async function updateAbout(req: Request, res: Response) {
  const email = req.params.email;
  const { bio, about } = req.body;
  try {
    const update = await User.findOneAndUpdate(
      { email },
      { bio, about },
      {
        new: true,
      }
    );
    if (!update) {
      return res.status(400).json({ message: "Unable to update about" });
    }
    return res.status(200).json({ messageL: "updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "something went wong In updateAbout" });
  }
}
