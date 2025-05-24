import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SavedTab, UploadsTab, FollowedTab } from '@/features/profile';

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
