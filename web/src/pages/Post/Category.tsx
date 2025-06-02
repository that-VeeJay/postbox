import { useParams } from 'react-router-dom';
import { Title, Note } from '@/components/shared';
import { CardThree } from '@/features/posts';
import type { PostType } from '@/features/posts/types';
import { useGetPostByCategory } from '@/features/posts/hooks/useGetPostByCategory';
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from '@/components/ui/pagination';
import CardOneSkeleton from '@/components/skeletons/CardOneSkeleton';
import { categories } from '@/data/categories';

export default function Category() {
   const { category } = useParams();

   const { data, isLoading } = useGetPostByCategory(category!);

   const posts = data?.data ?? [];
   const categoryExists = categories.find((cat) => cat.value === category);

   console.log(data);

   const renderCards = () => {
      if (isLoading) {
         return Array.from({ length: 8 }).map((_, index) => <CardOneSkeleton key={index} />);
      }

      if (posts.length > 0) {
         return posts.map((post: PostType) => <CardThree key={post.id} {...post} />);
      }

      if (!isLoading && posts.length === 0) {
         return (
            <div className="col-span-full">
               <Note message="No posts available for this category." type="info" />
            </div>
         );
      }
   };

   return (
      <main className="mx-auto w-full max-w-5xl">
         {!categoryExists ? (
            <div className="mt-8">
               <Note message="Not a valid category" type="warning" />
            </div>
         ) : (
            <>
               <Title title={category!.toUpperCase()} textCenter={true} />
               {/* // TODO: implement sorting */}
               <div className="grid gap-5 md:grid-cols-3">
                  <section className="col-span-2 space-y-5">
                     <div className="grid grid-cols-2 gap-3">{renderCards()}</div>
                     {posts.length > 0 && (
                        <Pagination>
                           <PaginationContent className="flex w-full justify-between">
                              <PaginationItem>
                                 <PaginationPrevious href="#" />
                              </PaginationItem>

                              <PaginationItem>
                                 <PaginationNext href="#" />
                              </PaginationItem>
                           </PaginationContent>
                        </Pagination>
                     )}
                  </section>
                  {/* EXPLORE SECTION */}
                  <section className="s block h-[max-content]">
                     <h2>EXPLORE OTHER CATEGORY</h2>
                     <h2>DISCOVER CREATORS</h2>
                  </section>
               </div>
            </>
         )}
      </main>
   );
}
