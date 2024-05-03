import { atom } from "recoil";
interface FirebaseUser {
  displayName: string;
  email: string;
  photoURL: string;
}
export const firebaseUserAtom = atom<FirebaseUser>({
  key: "user",
  default: {
    displayName: "",
    email: "",
    photoURL: "",
  },
});
