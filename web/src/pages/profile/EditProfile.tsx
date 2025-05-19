import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CustomToast from "@/components/shared/CustomToast";

type Props = {
  maxBioLength: number;
  token: string | null;
  user: any;
};

export type ProfileDataType = Partial<{
  name: string;
  location: string;
  bio: string;
  profile_picture: File | null;
}>;

const initialValues = { name: "", location: "", bio: "" };

export default function EditProfile({ maxBioLength, token, user }: Props) {
  const queryClient = useQueryClient();
  const [bioLength, setBioLength] = useState("");
  const [nameFieldError, setNameFieldError] = useState("");
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [profileData, setProfileData] =
    useState<ProfileDataType>(initialValues);

  // Set form data when user is loaded
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

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

  const { mutate } = useMutation({
    mutationFn: async (userInfo: any) => {
      const formData = new FormData();

      formData.append("_method", "PATCH");
      if (userInfo.name !== undefined) formData.append("name", userInfo.name);
      if (userInfo.location !== undefined)
        formData.append("location", userInfo.location);
      if (userInfo.bio !== undefined) formData.append("bio", userInfo.bio);
      if (
        userInfo.profile_picture instanceof File &&
        userInfo.profile_picture !== null
      ) {
        formData.append("profile_picture", userInfo.profile_picture);
      }
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      if (data.errors) {
        setNameFieldError(data.errors.name[0]);
        return;
      }
      setUpdateSuccessMessage("Profile updated successfully.");
      setNameFieldError("");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(profileData);
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
            {updateSuccessMessage && (
              <CustomToast message={updateSuccessMessage} type="success" />
            )}
            <div className="space-y-2">
              <Label htmlFor="">Name</Label>
              <Input
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
              <InputFieldError error={nameFieldError} />
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
            <div className="flex gap-3">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setProfileData({
                      name: user.name || "",
                      location: user.location || "",
                      bio: user.bio || "",
                    });
                    setUpdateSuccessMessage("");
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
              </SheetClose>
              {/* <SheetClose asChild> */}
              <Button type="submit" className="flex-2">
                Save Changes
              </Button>
              {/* </SheetClose> */}
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
