import { Auth } from "@/firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Auth.currentUser?.email) {
      navigate("/auth");
    }
  }, []);
  return <div>Home</div>;
}
