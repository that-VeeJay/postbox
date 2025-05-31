export function CardTitle({ title }: { title: string }) {
   return (
      <h2 className="line-clamp-2 h-[3.8rem] flex-1 text-lg font-semibold break-words transition duration-200 hover:text-neutral-600 dark:hover:text-neutral-300">
         {title}
      </h2>
   );
}
