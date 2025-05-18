import { ScrollArea } from "@/components/ui/scroll-area";
import UploadsCard from "./UploadsCard";

export default function UploadsTab() {
  return (
    <div className="w-full">
      <ScrollArea className="h-[525px] rounded-md border p-4">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <UploadsCard />
          <UploadsCard />
          <UploadsCard />
          <UploadsCard />
        </div>
      </ScrollArea>
    </div>
  );
}
