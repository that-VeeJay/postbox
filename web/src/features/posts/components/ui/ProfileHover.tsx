import { formatJoinDate } from '@/utils';
import { CalendarDays } from 'lucide-react';

type PropsType = {
   username: string;
   bio: string | undefined;
   createdAt: string;
};

export function ProfileHover({ username, bio, createdAt }: PropsType) {
   return (
      <div className="space-y-2">
         <h4>@{username}</h4>
         <p className="line-clamp-3 text-xs text-neutral-400">{bio}</p>
         <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <div className="text-sm">{formatJoinDate(createdAt)}</div>
         </div>
      </div>
   );
}
