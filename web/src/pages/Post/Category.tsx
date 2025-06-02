import { useParams, useSearchParams } from 'react-router-dom';
import { CardThree } from '@/features/posts';
import { categories } from '@/data/categories';
import { Note, Title } from '@/components/shared';
import type { PostType } from '@/features/posts/types';
import { CategoryPaginationButtons } from '@/features/posts';
import CardOneSkeleton from '@/components/skeletons/CardOneSkeleton';
import { useGetPostByCategory } from '@/features/posts/hooks/useGetPostByCategory';
import { CustomBadge } from '@/components/shared';
import { Link } from 'react-router-dom';

export default function Category() {
   const { category } = useParams();

   const [searchParams, setSearchParams] = useSearchParams();
   const page = parseInt(searchParams.get('page') || '1', 10);

   const { data, isLoading } = useGetPostByCategory(category!, page);

   const posts = data?.data ?? [];
   const categoryExists = categories.find((cat) => String(cat.value) === category);

   const handleSetPage = (newPage: number) => {
      setSearchParams({ page: newPage.toString() });
   };

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
                        <div className="my-10">
                           <CategoryPaginationButtons setPage={handleSetPage} data={data} />
                        </div>
                     )}
                  </section>
                  {/* EXPLORE SECTION */}
                  <section className="s block h-[max-content] space-y-10">
                     <div className="space-y-5">
                        <h2>EXPLORE OTHER CATEGORY</h2>
                        <div className="flex flex-wrap gap-3">
                           {categories.map((item) => (
                              <Link to={`/category/${item.value}`} key={item.id} className="block">
                                 <CustomBadge
                                    text={item.value}
                                    isActive={String(item.value) === category}
                                 />
                              </Link>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-5">
                        <h2>DISCOVER CREATORS</h2>
                     </div>
                  </section>
               </div>
            </>
         )}
      </main>
   );
}
