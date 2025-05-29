import { Skeleton } from '../ui/skeleton';

export default function CardOneSkeleton() {
   return (
      <div className="space-y-4">
         <Skeleton className="aspect-[16/7]" />
         <Skeleton className="h-[40px] w-full" />
         <Skeleton className="h-[80px] w-full" />
         <div className="flex items-center gap-3">
            <Skeleton className="h-[50px] w-[50px] rounded-full" />
            <Skeleton className="h-[30px] w-[150px]" />
         </div>
      </div>
   );
}
