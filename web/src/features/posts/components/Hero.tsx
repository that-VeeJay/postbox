import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { getImageUrl, getFirstLetter, timeAgo, capitalizeFirstLetter } from '@/utils';

import type { HeroProps } from '../types';

export default function Hero({
   title,
   image,
   category,
   created_at,
   user: { name, profile_picture },
}: HeroProps) {
   return (
      <>
         <div className="relative mx-auto w-full max-w-6xl">
            {/* Image */}
            <div className="aspect-video overflow-hidden">
               <img
                  src={getImageUrl(image)}
                  alt="Hero section image"
                  className="h-full w-full object-cover"
               />
            </div>
            {/* Content */}
            <div className="space-y-5 rounded-md bg-white p-6 lg:absolute lg:bottom-0 lg:left-0 lg:w-1/2 lg:translate-x-15 lg:translate-y-15 lg:p-10 lg:shadow-md dark:bg-neutral-950 dark:shadow-none lg:dark:bg-neutral-900">
               <Badge>{capitalizeFirstLetter(category)}</Badge>
               <h1 className="line-clamp-3 text-xl font-semibold lg:text-2xl">{title}</h1>
               <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                     <Avatar>
                        <AvatarImage src={getImageUrl(profile_picture)} />
                        <AvatarFallback>{getFirstLetter(name)}</AvatarFallback>
                     </Avatar>
                     <span>{name}</span>
                  </div>
                  <span>{timeAgo(created_at)}</span>
               </div>
            </div>
         </div>
      </>
   );
}
