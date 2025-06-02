import {
   CardThree,
   PaginationButtons,
   SortButtons,
   Sidebar,
   useCategoryPage,
} from '@/features/posts';
import { Title, Note } from '@/components/shared';
import CardOneSkeleton from '@/components/skeletons/CardOneSkeleton';
import type { PostType } from '@/features/posts/types';

export default function Category() {
   const {
      category,
      categoryExists,
      sort,
      posts,
      isLoading,
      data,
      postExist,
      handleSetPage,
      setSearchParams,
   } = useCategoryPage();

   if (!categoryExists) {
      return (
         <main className="mx-auto mt-8 w-full max-w-5xl">
            <Note message="Not a valid category" type="warning" />
         </main>
      );
   }

   return (
      <main className="mx-auto w-full max-w-5xl">
         <Title title={category!.toUpperCase()} textCenter={true} />
         <SortButtons sort={sort} disabled={!postExist} setSearchParams={setSearchParams} />
         <div className="grid gap-5 md:grid-cols-3">
            <section className="col-span-2 space-y-5">
               <div className="grid grid-cols-2 gap-3">
                  {isLoading ? (
                     Array.from({ length: 8 }).map((_, index) => <CardOneSkeleton key={index} />)
                  ) : postExist ? (
                     posts.map((post: PostType) => <CardThree key={post.id} {...post} />)
                  ) : (
                     <div className="col-span-full">
                        <Note message="No posts available for this category." type="info" />
                     </div>
                  )}
               </div>
               {postExist && (
                  <nav aria-label="Pagination navigation" className="my-10">
                     <PaginationButtons setPage={handleSetPage} data={data} />
                  </nav>
               )}
            </section>
            <Sidebar activeCategory={category!} />
         </div>
      </main>
   );
}
