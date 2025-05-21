import { Skeleton } from "../ui/skeleton";

export default function SingePostSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[500px] w-full"></Skeleton>
      <Skeleton className="h-[50px] w-[50%]"></Skeleton>
      <Skeleton className="h-[500px] w-full"></Skeleton>
    </div>
  );
}
