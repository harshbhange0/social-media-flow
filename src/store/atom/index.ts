import { atom } from "recoil";
interface FirebaseUser {
  displayName: string;
  email: string;
  photoURL: string;
}
export const firebaseUserAtom = atom<boolean>({
  key: "auth",
  default: false,
});
