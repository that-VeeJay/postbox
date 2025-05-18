import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { getImageUrl } from "@/helpers/getImageUrl";
import LocationPin from "@/components/icons/LocationPin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedTab from "./SavedTab";
import UploadsTab from "./UploadsTab";
import EditProfile from "./EditProfile";
import FollowedTab from "./FollowedTab";
import AccountSettings from "./AccountSettings";
import defaultProfile from "../../assets/default_profile.png";

export type FormDataType = Partial<{
  name: string;
  location: string;
  bio: string;
  profile_picture: File | null;
}>;

const MAX_BIO_LENGTH = 150;
const initialValues = { name: "", location: "", bio: "" };

export default function Profile() {
  const { user, token } = useContext(UserContext);
  const [profileData, setProfileData] = useState<FormDataType>(initialValues);

  const queryClient = useQueryClient();

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

  const updateUserInfo = async (userInfo: any) => {
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
  };

  const { mutate } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
      // do something...
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(profileData);
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-5 pt-5">
      <div className="space-y-8 md:space-y-15">
        {/* Top Section */}
        <div className="flex flex-col items-center gap-5 md:flex-row">
          {/* Profile Image */}
          <div className="flex-shrink-0 space-y-2">
            <img
              src={
                user?.profile_picture
                  ? getImageUrl(user?.profile_picture)
                  : defaultProfile
              }
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover"
            />
            <p className="text-center text-base text-neutral-400">
              {`@${user?.username}`}
            </p>
          </div>
          {/* Information */}
          <div className="flex w-full flex-col items-center gap-3 md:items-start">
            <div className="flex w-full flex-grow flex-col gap-3 md:flex-row md:justify-between">
              <div className="space-y-1">
                <p className="text-center text-3xl font-semibold md:text-left">
                  {capitalizeFirstLetter(user?.name)}
                </p>
                <div className="flex justify-center gap-1 md:justify-start">
                  {user?.location ? (
                    <div className="flex gap-2">
                      <LocationPin />
                      <small>{user.location}</small>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <AccountSettings handleSubmit={handleSubmit} />

                <EditProfile
                  setProfileData={setProfileData}
                  handleSubmit={handleSubmit}
                  profileData={profileData}
                  maxBioLength={MAX_BIO_LENGTH}
                />
              </div>
            </div>

            <div className="w-[80%] md:w-[50%]">
              <p className="text-sm">{user?.bio}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Tabs defaultValue="uploads" className="w-full">
          <TabsList>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="followed">Followed</TabsTrigger>
            <TabsTrigger value="saves">Saves</TabsTrigger>
          </TabsList>
          <TabsContent value="uploads">
            <UploadsTab />
          </TabsContent>
          <TabsContent value="followed">
            <FollowedTab />
          </TabsContent>
          <TabsContent value="saves">
            <SavedTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
