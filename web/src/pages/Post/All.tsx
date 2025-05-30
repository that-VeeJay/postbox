import { useEffect, useState } from 'react';

import { CardThree } from '@/features/posts';
import CardOneSkeleton from '@/components/skeletons/CardOneSkeleton';
import type { PostType } from '@/features/posts/types';
import { Note } from '@/components/shared';
import { useGetPosts } from '@/features/posts';
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';

export default function SectionThree() {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = Number(searchParams.get('page')) || 1;
   const { data: posts, isLoading, error } = useGetPosts(currentPage);
   const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

   useEffect(() => {
      if (posts?.last_page) {
         setTotalPages(posts.last_page);
      }

      if (totalPages && (currentPage < 1 || currentPage > totalPages)) {
         setSearchParams({ page: '1' });
      }
   }, [posts?.last_page, currentPage, setSearchParams]);

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

      if (Array.isArray(posts.data) && posts.data.length > 0) {
         return posts.data.map((post: PostType) => <CardThree key={post.id} {...post} />);
      }
   };

   return (
      <main className="mx-auto w-full max-w-6xl">
         <h1 className="my-8 inline-block bg-[linear-gradient(145deg,_#42d392,_#647eff,_#8E43AD)] bg-clip-text text-center text-4xl font-bold text-transparent">
            ALL BLOG POSTS
         </h1>

         <div className="mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{renderContent()}</div>
         <nav aria-label="Pagination">
            <Pagination className="mb-10">
               <PaginationContent className="flex w-full justify-between">
                  <PaginationItem>
                     <PaginationPrevious
                        aria-label="Previous page"
                        href={`?page=${currentPage - 1}`}
                        onClick={(e) => {
                           e.preventDefault();
                           if (currentPage > 1) {
                              setSearchParams({ page: String(Math.max(1, currentPage - 1)) });
                           }
                        }}
                     />
                  </PaginationItem>
                  <div />
                  <div className="flex items-center gap-8">
                     <span className="text-sm">
                        {currentPage} out of {totalPages} pages
                     </span>
                     <PaginationItem>
                        <PaginationNext
                           aria-label="Next page"
                           href={`?page=${currentPage + 1}`}
                           onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages!) {
                                 setSearchParams({ page: String(currentPage + 1) });
                              }
                           }}
                        />
                     </PaginationItem>
                  </div>
               </PaginationContent>
            </Pagination>
         </nav>
      </main>
   );
}
