import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { capitalizeFirstLetter, getImageUrl, stripHtml, timeAgo } from '@/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { CardTitle } from './ui/CardTitle';
import { CardImage } from './ui/CardImage';
import { ProfileHover } from './ui/ProfileHover';

import type { PostType } from '../types';

export default function CardTwo({
   title,
   body,
   slug,
   category,
   created_at,
   image,
   user: { name, username, bio },
}: PostType) {
   return (
      <div className="grid space-y-3 md:grid-cols-2">
         <link rel="preload" as="image" href={getImageUrl(image)}></link>
         <Link to={`/posts/${slug}`}>
            <CardImage image={image} title={title} styles="md:h-[210px] md:w-full" />
         </Link>

         <div className="flex flex-col justify-evenly px-5">
            <div className="space-y-3">
               <Link to={`/category/${category}`} className="block">
                  <Badge>{capitalizeFirstLetter(category)}</Badge>
               </Link>
               <Link to={`/posts/${slug}`}>
                  <CardTitle title={title} />
               </Link>
               <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {stripHtml(body)}
               </p>
            </div>
            <div className="mt-3 flex items-center gap-2">
               <HoverCard>
                  <HoverCardTrigger>
                     <Link to="/user/username">
                        <span className="text-sm">{name}</span>
                     </Link>
                  </HoverCardTrigger>
                  <HoverCardContent>
                     <ProfileHover username={username} bio={bio} createdAt={created_at} />
                  </HoverCardContent>
               </HoverCard>

               <span>•</span>
               <span className="text-sm">{timeAgo(created_at)}</span>
            </div>
         </div>
      </div>
   );
}
