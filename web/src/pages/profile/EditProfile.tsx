import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import type { FormDataType } from "./Show";

type Props = {
  setProfileData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  profileData: FormDataType;
  maxBioLength: number;
};

export default function EditProfile({
  setProfileData,
  handleSubmit,
  profileData,
  maxBioLength,
}: Props) {
  const [bioLength, setBioLength] = useState("");

  // handle image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, profile_picture: file }));
    }
  };

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save changes when you're
            done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-5">
            <div className="space-y-2">
              <Label htmlFor="">Name</Label>
              <Input
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="">Location</Label>
              <Input
                name="location"
                value={profileData.location}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="">Bio</Label>
              <Textarea
                maxLength={maxBioLength}
                name="bio"
                value={profileData.bio}
                className="resize-none"
                onChange={(e) => {
                  setBioLength(e.target.value);
                  handleChange(e);
                }}
              />
              <p className="text-xs">
                {bioLength.length}/{maxBioLength}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="">Profile picture</Label>
              <Input
                type="file"
                accept="image/*"
                name="profile_picture"
                onChange={handleFileChange}
              />
            </div>
            <SheetClose asChild>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
