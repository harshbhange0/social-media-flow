import { Toaster } from "./components/ui/toaster";
import AuthPage from "./pages/auth";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import PrivateRoutes from "./components/AuthRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./firebase/config";
import { useRecoilState } from "recoil";
import { firebaseUserAtom } from "./store/atom";
import Navbar from "./components/Navbar";
export interface userTypes {
  displayName: string;
  email: string;
  photoURL: string;
}
export default function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userTypes>();
  const [auth, setAuth] = useRecoilState(firebaseUserAtom);
  const getAuth = async () => {
    setLoading(true);
    await onAuthStateChanged(Auth, (user) => {
      if (user?.uid) {
        const { email, photoURL, displayName } = user;
        setUser({
          email: email!,
          photoURL: photoURL!,
          displayName: displayName!,
        });
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
    setLoading(false);
  };
  useEffect(() => {
    getAuth();
  }, [setAuth]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoutes auth={auth}>
              <Profile user={user!} loading={loading} />
            </PrivateRoutes>
          }
        ></Route>
        <Route path="/*" element={<>not found</>} />
      </Routes>
      <Toaster />
    </>
  );
}
