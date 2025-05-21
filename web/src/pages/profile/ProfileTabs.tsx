import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SavedTab from "../../features/profile/components/tabs/SavedTab";
import UploadsTab from "../../features/profile/components/tabs/UploadsTab";
import FollowedTab from "../../features/profile/components/tabs/FollowedTab";

export default function ProfileTabs() {
  return (
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
  );
}
