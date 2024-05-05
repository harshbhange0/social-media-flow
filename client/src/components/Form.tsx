import { Input } from "./ui/input";
import { PasswordInput } from "./ui/passwordInput";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import {
  SignInWithEmailAndPassword,
  SignUpWithEmailAndPassword,
  UserSignInTypes,
} from "@/utils/authActions";
import { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
export type FormProps = "register" | "login";

export default function Form({ type }: { type: FormProps }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<UserSignInTypes>({
    defaultValues: { email: "", password: "", username: "" },
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState, control, reset } = form;
  const { errors } = formState;
  const onSubmit = async (data: UserSignInTypes) => {
    setLoading(true);

    setError(false);
    try {
      if (type === "register") {
        if (data.email === "" || data.password === "" || data.username === "") {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 1000);
          return toast({
            variant: "destructive",
            description: "Pleas Fill all fields",
          });
        }
        const res = await SignUpWithEmailAndPassword(data);
        if (res) {
          toast({
            variant: "success",
            title: "Email and Password",
            description: "Register Successfully",
          });
        }
      } else {
        if (data.email === "" || data.password === "") {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 1000);
          return toast({
            variant: "destructive",
            description: "Pleas Fill all fields",
          });
        }
        const res = await SignInWithEmailAndPassword(data);
        if (res) {
          toast({
            variant: "success",
            title: "Email and Password",
            description: "Login Successfully",
          });
        }
      }

      return;
    } catch (error: any) {
      const erm: Error = error;
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);

      return toast({
        variant: "destructive",
        description: error
          ? erm.message.split("/")[1].replace(/-/g, " ")
          : "some thing went wrong",
      });
    } finally {
      navigate("/profile");
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col items-center gap-y-5"
      >
        <div className="w-full">
          <Input
            className={`w-full rounded-xl px-5 ring ring-transparent ${errors.email?.message || error ? " ring-red-400 focus-visible:ring-red-400" : ""} `}
            autoComplete="off"
            placeholder="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email?.message && (
            <p className="mt-1 px-5 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        {type === "register" && (
          <div className="w-full">
            <Input
              className={`w-full rounded-xl px-5 ring ring-transparent ${errors.username?.message || error ? " ring-red-400 focus-visible:ring-red-400" : ""} `}
              autoComplete="off"
              placeholder="username"
              {...register("username", {
                pattern: {
                  value: /[^A-Z0-9!@#\$%\^\&*\)\(+=._-]/,
                  message: "Username contains only small latter",
                },
              })}
            />
            {errors.username?.message && (
              <p className="mt-1 px-5 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
        )}
        <div className="w-full">
          <PasswordInput
            className={`w-full rounded-xl px-5 ring ring-transparent ${errors.password?.message || error ? " ring-red-400 focus-visible:ring-red-400" : ""} `}
            placeholder="password"
            {...register("password", {
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                message:
                  "Password should be between 6 to 20 characters and must be alphanumeric with special characters",
              },
            })}
          />
          {errors.password?.message && (
            <p className="mt-1 px-5 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className={`flex w-full items-center justify-center gap-5 rounded-full border bg-transparent  py-2 text-black hover:bg-gray-50 hover:text-black/80 ${error ? "cursor-not-allowed" : ""} `}
          disabled={error || loading}
        >
          {type === "register" ? "Create Account" : "Log in "}
        </Button>

        {type === "register" && (
          <p className="text-concrete text-[13px]">
            By clicking <span className="font-semibold">"Create account"</span>,
            you agree to Linktree's Terms and Conditions and confirm you have
            read our Privacy Notice. You may receive offers, news and updates
            from us.
          </p>
        )}
      </form>
      <DevTool control={control} />
    </>
  );
}
