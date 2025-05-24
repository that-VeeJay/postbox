import { getFirstLetter, getImageUrl, timeAgo } from '@/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { CommentItemProps } from '../../types';
import { CommentInteractions } from './CommentInteractions';
import { CommentActions } from './CommentActions';

export function CommentItem({ comment }: CommentItemProps) {
   return (
      <div className="flex gap-3">
         <Avatar>
            <AvatarImage src={getImageUrl(comment.user.profile_picture)} />
            <AvatarFallback>{getFirstLetter(comment.user.name)}</AvatarFallback>
         </Avatar>
         <div className="w-full space-y-1">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                     @{comment.user.username}
                  </p>
                  <small className="text-xs text-neutral-600 dark:text-neutral-400">
                     {timeAgo(comment.created_at)}
                  </small>
               </div>
               <CommentActions />
            </div>
            <p>{comment.body}</p>
            {/* Interactions */}
            <div className="space-y-3">
               <CommentInteractions commentId={comment.id} />
            </div>
         </div>
      </div>
   );
}
