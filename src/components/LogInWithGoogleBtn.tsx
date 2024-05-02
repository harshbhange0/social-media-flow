import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

export default function LogInWithGoogleBtn() {
  return (
    <Button className="flex w-full items-center justify-center gap-5 rounded-full border bg-transparent  py-2 text-black hover:bg-gray-50 hover:text-black/80">
      <FcGoogle className="text-3xl" />
      <span className="text-xl">Continue with Google</span>
    </Button>
  );
}
