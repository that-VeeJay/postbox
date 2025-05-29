import { useGetPosts, CardThree } from '@/features/posts';
import CardOneSkeleton from '@/components/skeletons/CardOneSkeleton';
import { Note } from '@/components/shared';
import type { PostType } from '@/features/posts/types';
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';

export default function All() {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = parseInt(searchParams.get('page') || '1', 10);
   const { data, isLoading, error } = useGetPosts(currentPage);

   const totalPages = data?.last_page || currentPage;

   const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
         setSearchParams({ page: String(page) });
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const renderContent = () => {
      if (isLoading) {
         return Array.from({ length: 6 }).map((_, index) => <CardOneSkeleton key={index} />);
      }

      if (error) {
         return (
            <div className="col-span-full text-center">
               <Note message="Failed to load posts. Please try again later" type="error" />
            </div>
         );
      }

      if (Array.isArray(data?.data) && data.data.length > 0) {
         return data.data.map((post: PostType) => <CardThree key={post.id} {...post} />);
      }

      return (
         <div className="col-span-full text-center">
            <Note message="No posts available." type="info" />
         </div>
      );
   };

   const renderPageLinks = () => {
      const links = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
         start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
         links.push(
            <PaginationItem key={i}>
               <PaginationLink
                  href="#"
                  isActive={i === currentPage}
                  onClick={(e) => {
                     e.preventDefault();
                     handlePageChange(i);
                  }}
               >
                  {i}
               </PaginationLink>
            </PaginationItem>
         );
      }

      return links;
   };

   return (
      <main className="mx-auto flex w-full max-w-6xl flex-col justify-between">
         <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{renderContent()}</div>

         <Pagination className="mt-10">
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                     }}
                  />
               </PaginationItem>

               {renderPageLinks()}

               {totalPages > 5 && currentPage < totalPages - 2 && (
                  <PaginationItem>
                     <PaginationEllipsis />
                  </PaginationItem>
               )}

               <PaginationItem>
                  <PaginationNext
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                     }}
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </main>
   );
}
