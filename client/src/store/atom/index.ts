import { atom } from "recoil";
export const firebaseUserAtom = atom<boolean>({
  key: "auth",
  default: false,
});
