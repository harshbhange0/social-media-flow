import { Auth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { z } from "zod";

export const UserSignInSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserSignInTypes = z.infer<typeof UserSignInSchema>;

export const SignInWithEmailAndPassword = async (data: UserSignInTypes) => {
  try {
    const res = await createUserWithEmailAndPassword(
      Auth,
      data.email,
      data.password,
    );
    const newRes = await updateProfile(res.user, {
      displayName: data.username,
    });

    return { res };
  } catch (error: any | FirebaseError) {
    throw new Error(error.code.toString());
  }
};
