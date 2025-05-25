import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getImageUrl, getFirstLetter } from '@/utils';
import { timeAgo } from '@/utils';

export function ReplyItem({ reply }: { reply: any }) {
   return (
      <div className="flex items-start gap-3">
         <Avatar className="h-[30px] w-[30px]">
            <AvatarImage src={getImageUrl(reply.user.profile_picture)} />
            <AvatarFallback>{getFirstLetter(reply.user.name)}</AvatarFallback>
         </Avatar>
         <div>
            <div className="flex items-center gap-3">
               <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  @{reply.user.username}
               </p>
               <small className="text-xs text-neutral-600 dark:text-neutral-400">
                  {timeAgo(reply.created_at)}
               </small>
            </div>
            <p className="line-clamp-2">{reply.body}</p>
         </div>
      </div>
   );
}
