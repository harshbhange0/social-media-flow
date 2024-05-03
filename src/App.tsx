import { useRecoilState } from "recoil";
import { Toaster } from "./components/ui/toaster";
import Auth from "./pages/auth";
import { firebaseUserAtom } from "./store/atom";

export default function App() {
  const [user, setUser] = useRecoilState(firebaseUserAtom);
  return (
    <>
      <Toaster />
      <Auth />
    </>
  );
}
