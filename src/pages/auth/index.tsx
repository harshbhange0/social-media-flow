import Form from "@/components/Form";
import LogInWithGoogleBtn from "@/components/LogInWithGoogleBtn";
import sideImg from "/auth-side.png";

export default function Auth() {
  return (
    <div className="grid min-h-screen w-full grid-cols-6 place-items-center">
      <div className="col-span-6 md:col-span-4 flex w-full max-w-md flex-col gap-y-5">
        <div className="mb-10 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold">Join</h1>
          <span className="mx-auto mt-3 text-sm text-gray-500">
            Sign up for free
          </span>
        </div>
        <Form />
        <span className="mx-auto text-gray-500">OR</span>
        <LogInWithGoogleBtn />
        <span className="mt-4 text-center">
          Already have an account? Log in
        </span>
      </div>
      <div
        className="hidden md:block md:col-span-2 h-full w-full bg-cover"
        style={{ backgroundImage: `url(${sideImg})` }}
      ></div>
    </div>
  );
}
