import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { Auth } from "@/firebase/config";
import { toast } from "./ui/use-toast";

export default function UpdateAbout() {
  const [about, setAbout] = useState({ bio: "", about: "" });
  const [loading, setLoading] = useState(false);
  const updateAbout = async () => {
    setLoading(true);
    try {
      if (Auth.currentUser?.email) {
        const res = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}user/update/profile/about/${Auth.currentUser?.email}`,
          {
            bio: about.bio,
            about: about.about,
          },
        );
        if (res.status == 200) {
          setAbout({ bio: "", about: "" });
          return toast({
            variant: "success",
            description: "Profile updated ",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Unable to update profile",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <div className="grid w-full grid-cols-1 gap-3 px-2">
            <Label htmlFor="About" className="flex flex-col gap-y-2">
              <span>Bio</span>
              <Input
                value={about.bio}
                onChange={(e) => {
                  setAbout({ ...about, bio: e.target.value });
                }}
                className=""
                placeholder="bio"
                id="About"
              />
            </Label>
            <Label htmlFor="About" className="flex flex-col gap-y-2">
              <span>About</span>
              <Textarea
                value={about.about}
                onChange={(e) => {
                  setAbout({ ...about, about: e.target.value });
                }}
                id="About"
                placeholder="Add Something About "
              />
            </Label>
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={updateAbout}
              variant={"ghost"}
              type="submit"
            >
              Update{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
