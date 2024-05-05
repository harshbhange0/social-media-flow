import { Auth } from "@/firebase/config";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";

export default function Navbar() {
  Auth;
  return (
    <div className="flex items-center justify-center gap-5 border-b  py-4">
      <Link to={"/"}>Home</Link>
      {Auth.currentUser?.email ? (
        <>
          <Link to={"/profile"}>Profile</Link>
          <Button variant={"link"}
            onClick={() => {
              signOut(Auth);
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <Link to={"/auth"}>Register</Link>
      )}
    </div>
  );
}
