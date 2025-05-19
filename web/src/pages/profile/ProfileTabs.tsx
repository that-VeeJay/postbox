import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SavedTab from "./SavedTab";
import UploadsTab from "./UploadsTab";
import FollowedTab from "./FollowedTab";

type PropsType = {
  defaultTab: string;
};

export default function ProfileTabs({ defaultTab }: PropsType) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
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
