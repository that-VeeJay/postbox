import { capitalizeFirstLetter } from '@/utils';

type CustomBadgePropsType = {
   text: string;
   isActive: boolean;
};

export default function CustomBadge({ text, isActive }: CustomBadgePropsType) {
   return (
      <div className="transition duration-200 hover:scale-105">
         <span className="shine-hover relative inline-flex items-center gap-1 rounded-full border-2 border-neutral-300 bg-neutral-400/50 px-3 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800/75 dark:text-white">
            {isActive && <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />}
            <span>{capitalizeFirstLetter(text)}</span>
         </span>
      </div>
   );
}
