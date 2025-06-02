type Props = {
   sort: string;
   disabled: boolean;
   setSearchParams: any;
};

const baseClass =
   'relative disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const underline =
   'before:absolute before:-bottom-2 before:left-0 before:h-[3px] before:w-full before:bg-black before:content-[""] dark:before:bg-white';

export default function SortButtons({ sort, disabled, setSearchParams }: Props) {
   return (
      <div className="relative mb-5 flex items-center gap-3">
         <button
            role="radio"
            aria-checked={sort === 'newest'}
            disabled={disabled}
            type="button"
            aria-label="Newest Post button"
            onClick={() => setSearchParams({ page: '1', sort: 'newest' })}
            className={`${baseClass} ${sort === 'newest' ? `${underline}` : ''}`}
         >
            Newest
         </button>
         <button
            role="radio"
            aria-checked={sort === 'oldest'}
            disabled={disabled}
            type="button"
            aria-label="Oldest Post button"
            onClick={() => setSearchParams({ page: '1', sort: 'oldest' })}
            className={`${baseClass} ${sort === 'oldest' ? `${underline}` : ''}`}
         >
            Oldest
         </button>
      </div>
   );
}
