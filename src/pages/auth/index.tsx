import Form, { FormProps } from "@/components/Form";
import LogInWithGoogleBtn from "@/components/LogInWithGoogleBtn";
import sideImg from "/auth-side.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AuthPage() {
  const [formType, setFormType] = useState<FormProps>("register");
  return (
    <div
      className="grid min-h-screen w-full grid-cols-6 place-items-center
    px-2 md:px-0"
    >
      <div className="col-span-6 flex w-full max-w-md flex-col gap-y-5 md:col-span-4">
        <div className="mb-10 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold">Join</h1>
          <span className="mx-auto mt-3 text-sm text-gray-500">
            Sign {formType === "register" ? "up" : "in"} for free
          </span>
        </div>
        <Form type={formType} />
        <span className="mx-auto text-gray-500">OR</span>
        <LogInWithGoogleBtn />
        <span className="mt-4 text-center">
          {formType == "register" ? "Already " : "Don't"} have an account?
          <Button
            className="bg-transparent px-1 text-[16px] text-blue-500 underline hover:bg-transparent"
            onClick={() =>
              setFormType((pre) => {
                if (pre === "register") {
                  return "login";
                } else {
                  return "register";
                }
              })
            }
          >
            {formType == "register" ? "Login" : "Register"}
          </Button>
        </span>
      </div>
      <div
        className="hidden h-full w-full bg-cover md:col-span-2 md:block"
        style={{ backgroundImage: `url(${sideImg})` }}
      ></div>
    </div>
  );
}
