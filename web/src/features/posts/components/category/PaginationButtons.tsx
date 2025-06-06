import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';

type CategoryPaginationButtonsProps = {
   setPage: (page: number) => void;
   data: {
      current_page: number;
      last_page: number;
      next_page_url: number | null;
      prev_page_url: number | null;
   };
};

export default function PaginationButtons({ setPage, data }: CategoryPaginationButtonsProps) {
   const handlePrevious = () => {
      if (data.current_page > 1) {
         setPage(data.current_page - 1);
      }
   };

   const handleNext = () => {
      if (data.next_page_url) {
         setPage(data.current_page + 1);
      }
   };

   return (
      <Pagination>
         <PaginationContent className="flex w-full justify-between">
            <PaginationItem>
               <PaginationPrevious
                  aria-label="Previous page"
                  onClick={handlePrevious}
                  className={data.prev_page_url ? '' : 'pointer-events-none opacity-50'}
               />
            </PaginationItem>
            <div role="status" aria-live="polite" className="text-sm text-neutral-500">
               Page {data.current_page} of {data.last_page}
            </div>
            <PaginationItem>
               <PaginationNext
                  aria-label="Next page"
                  onClick={handleNext}
                  className={data.next_page_url ? '' : 'pointer-events-none opacity-50'}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
