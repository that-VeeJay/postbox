import { Link } from 'react-router-dom';

import timeAgo from '@/utils/timeAgo';
import { getImageUrl } from '@/utils/getImageUrl';
import { truncateText } from '@/utils/truncateText';
import { getFirstLetter } from '@/utils/getFirstLetter';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { MdArrowOutward } from 'react-icons/md';

import type { PostType } from '../types';

export default function CardThree({
   id,
   image,
   title,
   category,
   body,
   created_at,
   user: { profile_picture, name },
}: PostType) {
   return (
      <div className="space-y-3">
         {/* Post Image */}
         <Link to={`/posts/${id}`}>
            <div className="aspect-[16/7]">
               <img
                  src={getImageUrl(image)}
                  loading="lazy"
                  alt={`Featured image for the blog post "${title}"`}
                  draggable="false"
                  width={1600}
                  height={700}
                  className="h-full w-full object-cover"
               />
            </div>
         </Link>
         <div className="space-y-3 p-3">
            {/* Pot Category */}
            <Badge>{capitalizeFirstLetter(category)}</Badge>

            {/* Pot Title */}
            <Link to={`/posts/${id}`} className="flex items-start justify-between gap-2">
               <h2 className="line-clamp-2 h-[3.8rem] flex-1 text-lg font-semibold break-words transition duration-200 hover:text-neutral-600 dark:hover:text-neutral-300">
                  {title}
               </h2>

               <div className="flex flex-shrink-0 items-center pl-2">
                  <MdArrowOutward size={25} />
               </div>
            </Link>

            <p className="line-clamp-2 h-[2.5rem] text-sm">{body}</p>
            <div className="flex items-center justify-between gap-5">
               {/* User Info */}
               <div className="flex items-center gap-3">
                  <Avatar>
                     <AvatarImage src={getImageUrl(profile_picture)} />
                     <AvatarFallback>{getFirstLetter(name)}</AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{truncateText(name, 20)}</span>
               </div>
               <time className="font-base text-sm text-neutral-600 dark:text-neutral-400">
                  {timeAgo(created_at)}
               </time>
            </div>
         </div>
      </div>
   );
}
