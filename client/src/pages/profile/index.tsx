import { userTypes } from "@/App";
import UpdateAbout from "@/components/UpdateAbout";
import UpdateProfilePicture from "@/components/UpdateProfilePicture";
import { Auth } from "@/firebase/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile({
  user,
  loading,
}: {
  user: userTypes;
  loading: boolean;
}) {
  const [about, setAbout] = useState({ bio: "", about: "" });
  const getAbout = async () => {
    if (Auth.currentUser?.email) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/profile/${Auth.currentUser?.email}`,
        );
        const user = res.data.user;
        if (user.about && user.bio) {
          return setAbout({
            bio: user.bio,
            about: user.about,
          });
        }
        return null;
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAbout();
  }, []);
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
              <span className="ps-2 text-sm text-gray-400">
                {user?.displayName}
              </span>{" "}
              <br />
              <span className="ps-2 text-sm text-gray-400">{user?.email}</span>
            </div>
            <div className="mb-4">
              <h6 className="mb-2 px-1">Bio</h6>
              <p className="ps-2 text-sm text-gray-400">
                {about.bio ? about.bio : "update bio"}
              </p>
            </div>
            <div className="mb-4">
              <h6 className="mb-2 px-1">About</h6>
              <p className="ps-2 text-sm text-gray-400">
                {about.about ? about.about : "update about"}
              </p>
            </div>
            <div className="flex w-full justify-end">
              <UpdateAbout />
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
