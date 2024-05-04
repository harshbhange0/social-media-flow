import { userTypes } from "@/App";
import UpdateProfilePicture from "@/components/UpdateProfilePicture";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Profile({
  user,
  loading,
}: {
  user: userTypes;
  loading: boolean;
}) {
  return (
    <div className="container mx-auto min-h-screen max-w-3xl pt-10">
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <div className="flex h-72 w-1/2 flex-col items-center justify-center ">
          {loading ? (
            <div className="h-52 w-52 animate-pulse rounded-full" />
          ) : (
            <>
              <img
                className="size-fit rounded-full object-center sm:size-52"
                src={user?.photoURL}
                alt=""
              />
            </>
          )}
          <div className="mt-2">
            <UpdateProfilePicture />
          </div>
        </div>
        <div className="mt-auto h-full w-full md:w-1/2">
          <ProfileItemBox>
            <div className="mb-4">
              <h6 className="mb-2 px-1">Profile</h6>
              <span className="ps-2 text-sm text-gray-400">
                {user?.displayName}
              </span>{" "}
              <br />
              <span className="ps-2 text-sm text-gray-400">{user?.email}</span>
            </div>
            <div className="mb-4">
              <h6 className="mb-2 px-1">About</h6>
              <p className="ps-2 text-sm text-gray-400">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt, dolorem.
              </p>
            </div>
            <div className="flex w-full justify-end">
              <Button variant={"ghost"}>Update profile</Button>
            </div>
          </ProfileItemBox>
        </div>
      </div>
    </div>
  );
}

const ProfileItemBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-lg border bg-gray-100/20 p-2">{children}</div>;
};
