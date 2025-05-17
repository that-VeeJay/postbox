import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LocationPin from "@/components/icons/LocationPin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import UploadsCard from "./profile/UploadsCard";
import defaultProfilePicture from "../assets/posts/profile1.jpg";

const uploadsTab = () => {
  return (
    <div className="w-full">
      <ScrollArea className="h-[550px] rounded-md border p-4">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <UploadsCard />
          <UploadsCard />
        </div>
      </ScrollArea>
    </div>
  );
};

const followedTab = () => {
  return (
    <div className="w-full">
      <ScrollArea className="h-[500px] w-full rounded-md border p-4">
        FOLLOWED TAB CONTENT
      </ScrollArea>
    </div>
  );
};

const savesTab = () => {
  return (
    <div className="w-full">
      <ScrollArea className="h-[500px] w-full rounded-md border p-4">
        SAVES TAB CONTENT
      </ScrollArea>
    </div>
  );
};

export default function Profile() {
  return (
    <div className="mx-auto w-full max-w-6xl p-5 pt-5">
      <div className="space-y-8 md:space-y-15">
        {/* Top Section */}
        <div className="flex flex-col items-center gap-5 md:flex-row">
          {/* Profile Image */}
          <div className="flex-shrink-0 space-y-1">
            <img
              src={defaultProfilePicture}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover"
            />
            <p className="text-center text-base text-neutral-400">@username</p>
          </div>
          {/* Information */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
              <div>
                <p className="text-center text-3xl font-semibold md:text-left">
                  Anne Curtis Smith
                </p>
                <div className="flex justify-center gap-1 md:justify-start">
                  <LocationPin />
                  <small>Philippines, Misamis Occidental</small>
                </div>
              </div>
              <div className="text-center">
                <Sheet>
                  <SheetTrigger>
                    {" "}
                    <Button variant="outline" className="w-fit">
                      Edit Profile
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save changes
                        when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <form>
                      <div className="space-y-5 px-5">
                        <div className="space-y-2">
                          <Label htmlFor="">Name</Label>
                          <Input />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="">Location</Label>
                          <Input />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="">Bio</Label>
                          <Textarea className="resize-none" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="">Profile picture</Label>
                          <Input type="file" />
                        </div>
                        <SheetClose asChild>
                          <Button className="w-full">Save Changes</Button>
                        </SheetClose>
                      </div>
                    </form>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="w-[80%] md:w-[50%]">
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae, blanditiis. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Deleniti, dolores!
              </p>
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
          <TabsContent value="uploads">{uploadsTab()}</TabsContent>
          <TabsContent value="followed">{followedTab()}</TabsContent>
          <TabsContent value="saves">{savesTab()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
