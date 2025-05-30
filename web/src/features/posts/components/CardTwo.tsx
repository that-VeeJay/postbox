import { Badge } from '@/components/ui/badge';
import { capitalizeFirstLetter, timeAgo, stripHtml, getImageUrl } from '@/utils';
import type { PostType } from '../types';

export default function CardTwo({
   title,
   body,
   category,
   created_at,
   image,
   user: { name },
}: PostType) {
   return (
      <div className="grid space-y-3 md:grid-cols-2">
         <link rel="preload" as="image" href={getImageUrl(image)}></link>
         <img
            src={getImageUrl(image)}
            alt={`Featured image for the blog post "${title}"`}
            draggable="false"
            width={1600}
            height={700}
            className="aspect-[16/7] object-cover md:h-[210px] md:w-full"
         />
         <div className="flex flex-col justify-evenly px-5">
            <div className="space-y-3">
               <Badge>{capitalizeFirstLetter(category)}</Badge>
               <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
               <p className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {stripHtml(body)}
               </p>
            </div>
            <div className="mt-3 flex gap-2">
               <span className="text-sm">{name}</span>
               <span>•</span>
               <span className="text-sm">{timeAgo(created_at)}</span>
            </div>
         </div>
      </div>
   );
}
