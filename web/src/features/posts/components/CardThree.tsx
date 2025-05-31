import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { stripHtml } from '@/utils/stripHtml';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { capitalizeFirstLetter, getFirstLetter, getImageUrl, timeAgo, truncateText } from '@/utils';

import { CardTitle } from './ui/CardTitle';
import { CardImage } from './ui/CardImage';
import { ProfileHover } from './ui/ProfileHover';

import type { PostType } from '../types';

export default function CardThree({
   image,
   title,
   slug,
   category,
   body,
   created_at,
   user: { profile_picture, name, username, bio },
}: PostType) {
   return (
      <div className="space-y-3">
         {/* Post Image */}
         <Link to={`/posts/${slug}`}>
            <CardImage image={image} title={title} />
         </Link>
         <div className="space-y-3 p-3">
            {/* Pot Category */}
            <Link to={`/category/${category}`} className="block">
               <Badge>{capitalizeFirstLetter(category)}</Badge>
            </Link>

            {/* Pot Title */}
            <Link to={`/posts/${slug}`} className="flex items-start justify-between gap-2">
               <CardTitle title={title} />

               <div className="flex flex-shrink-0 items-center pl-2">
                  <ArrowUpRight size={25} />
               </div>
            </Link>

            <p className="line-clamp-2 h-[2.5rem] text-sm text-neutral-600 dark:text-neutral-400">
               {stripHtml(body)}
            </p>
            <div className="flex items-center justify-between gap-5">
               {/* User Info */}
               <HoverCard>
                  <HoverCardTrigger>
                     <Link to="/user/username">
                        <div className="flex items-center gap-3">
                           <Avatar>
                              <AvatarImage src={getImageUrl(profile_picture)} />
                              <AvatarFallback>{getFirstLetter(name)}</AvatarFallback>
                           </Avatar>
                           <span className="line-clamp-1">{truncateText(name, 20)}</span>
                        </div>
                     </Link>
                  </HoverCardTrigger>
                  <HoverCardContent>
                     <ProfileHover username={username} bio={bio} createdAt={created_at} />
                  </HoverCardContent>
               </HoverCard>

               <time className="font-base text-sm text-neutral-600 dark:text-neutral-400">
                  {timeAgo(created_at)}
               </time>
            </div>
         </div>
      </div>
   );
}
