import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { Auth, GProvider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { adduserToDb } from "@/utils/authActions";

export default function LogInWithGoogleBtn() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(Auth, GProvider);
      toast({
        variant: "success",
        title: "Google ",
        description: "You are logged in with Google",
      });
      if (res.user?.email) {
        await adduserToDb();
      }
      const idToken = await res.user.getIdToken(true);
      localStorage.setItem("authorization", idToken!);
    } catch (error: any) {
      const erm: Error = error;

      return toast({
        variant: "destructive",
        description: error
          ? erm.message.split("/")[1].replace(/-/g, " ")
          : "some thing went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className="flex w-full items-center justify-center gap-5 rounded-full border bg-transparent  py-2 text-black hover:bg-gray-50 hover:text-black/80"
      disabled={loading}
      onClick={handleClick}
    >
      <FcGoogle className="text-2xl" />
      <span className="">Continue with Google</span>
    </Button>
  );
}
