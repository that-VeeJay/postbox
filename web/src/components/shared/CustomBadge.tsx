import { capitalizeFirstLetter } from '@/utils';

export default function CustomBadge({ text }: { text: string }) {
   return (
      <div className="transition duration-200 hover:scale-105">
         <span className="shine-hover relative inline-block rounded-full border-2 border-neutral-300 bg-neutral-400/50 px-3 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800/75 dark:text-white">
            {capitalizeFirstLetter(text)}
         </span>
      </div>
   );
}
