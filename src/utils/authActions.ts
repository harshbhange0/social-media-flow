import { Auth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { z } from "zod";

export const UserSignInSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3, "Username is required").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserSignInTypes = z.infer<typeof UserSignInSchema>;

export const SignUpWithEmailAndPassword = async (data: UserSignInTypes) => {
  try {
    const res = await createUserWithEmailAndPassword(
      Auth,
      data.email,
      data.password,
    );
    const idToken = await res.user.getIdToken(true);
    localStorage.setItem("authorization", idToken!);
    const newRes = await updateProfile(res.user, {
      displayName: data.username,
    });

    return { res };
  } catch (error: any | FirebaseError) {
    throw new Error(error.code.toString());
  }
};

export const SignInWithEmailAndPassword = async (data: UserSignInTypes) => {
  try {
    const res = await signInWithEmailAndPassword(
      Auth,
      data.email,
      data.password,
    );
    const idToken = await res.user.getIdToken(true);
    localStorage.setItem("authorization", idToken!);
    return res;
  } catch (error: any | FirebaseError) {
    throw new Error(error.code.toString());
  }
};

export const getAuth = async (): Promise<{
  displayName: string;
  email: string;
  photoURL: string;
} | null> => {
  const user: User = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      unsubscribe();
      //@ts-ignore
      resolve(user);
    });
  });

  if (!user) {
    return null;
  } else {
    const { displayName, email, photoURL } = user;

    if (!displayName || !email || !photoURL) {
      throw new Error("Missing required user information");
    }

    return { displayName, email, photoURL };
  }
};
