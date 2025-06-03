import { Hero } from '@/features/posts';
import { useGetFeatured } from '@/features/posts/hooks/useGetFeatured';
import { Note } from '@/components/shared';

export default function SectionOne() {
   const { data: featuredPost, error } = useGetFeatured();

   return (
      <>
         {error && (
            <div className="col-span-full mt-20 text-center">
               <Note message="Failed to load posts. Please try again later" type="error" />
            </div>
         )}
         {featuredPost && (
            <Hero
               title={featuredPost.title}
               image={featuredPost.image}
               category={featuredPost.category}
               created_at={featuredPost.created_at}
               user={featuredPost.user}
               slug={featuredPost.slug}
            />
         )}
      </>
   );
}
