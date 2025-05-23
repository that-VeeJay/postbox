import { Skeleton } from "../ui/skeleton";

export function CommentLoadSkeleton() {
  return (
    <div className="mt-10 flex w-full gap-3">
      <Skeleton className="h-[50px] w-[50px] rounded-full"></Skeleton>
      <div className="w-full space-y-3">
        <Skeleton className="h-[60px] w-full"></Skeleton>
        <Skeleton className="h-[30px] w-[200px]"></Skeleton>
      </div>
    </div>
  );
}
