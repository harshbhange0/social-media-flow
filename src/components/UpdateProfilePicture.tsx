import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { Auth, storage } from "@/firebase/config";
import { toast } from "./ui/use-toast";
import { updateProfile } from "firebase/auth";

export default function UpdateProfilePicture() {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedImgUrl(null);
    if (e.target.files == null) {
      toast({ variant: "destructive", description: "Pleas Select Image" });
      return setUploadedImgUrl(null);
    }
    const file = e.target.files[0];
    if (file.name == undefined || null) {
      toast({ variant: "destructive", description: "Pleas Select Image" });
      return setUploadedImgUrl(null);
    }
    setLoading(true);

    const imageRef = storageRef(storage, `profile/${file?.name}`);
    const snapshot = await uploadBytes(imageRef, file!);

    const url = await getDownloadURL(snapshot.ref);
    setUploadedImgUrl(url);
    setLoading(false);
  };
  const handleUpdateProfile = async () => {
    setLoading(true);
    if (uploadedImgUrl == undefined || null || "") {
      toast({ variant: "destructive", description: "Pleas Select Image" });
      return setUploadedImgUrl(null);
    }
    if (Auth.currentUser || uploadedImgUrl) {
      await updateProfile(Auth.currentUser!, { photoURL: uploadedImgUrl });
      toast({
        variant: "success",
        description: "Profile Picture Updated",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update Profile Picture</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="grid place-items-center gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4">
                {uploadedImgUrl === null ? (
                  <p className="text-center">Pleas Select Image</p>
                ) : (
                  <img
                    className="mx-auto size-32 rounded-full object-center shadow-md"
                    src={uploadedImgUrl === null ? undefined : uploadedImgUrl}
                    alt="profile picture"
                  />
                )}
              </div>
              <Input
                id="username"
                onChange={(e) => handleFile(e)}
                accept="image/png,image/jpeg"
                type="file"
                className="col-span-4"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleUpdateProfile}
              variant={"ghost"}
              type="submit"
            >
              {loading ? "loading..." : "Update Picture"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
