import { Auth } from "@/firebase/config";
import axios from "axios";
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
    if (res.user.email) {
      await adduserToDb();
    }
    return res;
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

export const adduserToDb = async () => {
  if (Auth.currentUser?.email || Auth.currentUser?.photoURL) {
    const user = {
      email: Auth.currentUser?.email,
      photoUrl: Auth.currentUser?.photoURL,
    };
    try {
      const res = await axios.post("http://localhost:3021/api/v1/create/user", {
        ...user,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

export const updateProfilePicture = async (photoUrl: string) => {
  if (Auth.currentUser?.email) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}user/update/profile/photo/${Auth.currentUser?.email}`,
        { photoUrl: photoUrl },
      );
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
};
