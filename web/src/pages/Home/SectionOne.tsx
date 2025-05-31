import { Hero } from '@/features/posts';
import { useGetFeatured } from '@/features/posts/hooks/useGetFeatured';

export default function SectionOne() {
   const { data: featuredPost } = useGetFeatured();

   return (
      <>
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
