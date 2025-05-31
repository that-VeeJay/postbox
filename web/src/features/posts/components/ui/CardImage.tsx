import { getImageUrl } from '@/utils';

type CardImageProps = {
   styles?: string;
   image: string;
   title: string;
};

export function CardImage({ styles, image, title }: CardImageProps) {
   return (
      <div className={`aspect-[16/7] overflow-hidden ${styles}`}>
         <img
            src={getImageUrl(image)}
            alt={`Featured image for the blog post "${title}"`}
            loading="lazy"
            draggable="false"
            width={1600}
            height={700}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-103"
         />
      </div>
   );
}
