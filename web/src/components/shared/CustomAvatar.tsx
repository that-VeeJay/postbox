import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstLetter } from '@/utils';
import { getImageUrl } from '@/utils';

type PropsType = {
   image: string;
   alt: string;
   fallback: string;
};

export function CustomAvatar({ image, alt, fallback }: PropsType) {
   return (
      <Avatar>
         <AvatarImage src={getImageUrl(image)} alt={`${alt}]s profile picture`} />
         <AvatarFallback>{getFirstLetter(fallback)}</AvatarFallback>
      </Avatar>
   );
}
