import { CardTwo } from '@/features/posts';
import { useGetRecentPosts } from '@/features/posts/hooks/useGetRecentPosts';
import type { PostType } from '@/features/posts/types';
import CardTwoSkeleton from '@/components/skeletons/CardTwoSkeleton';

export default function SectionTwo() {
   const { data, isLoading } = useGetRecentPosts();

   const renderContent = () => {
      if (isLoading) {
         return Array.from({ length: 4 }).map((_, index) => <CardTwoSkeleton key={index} />);
      }

      if (Array.isArray(data) && data.length > 0) {
         return data.map((post: PostType) => <CardTwo key={post.id} {...post} />);
      }
   };

   return renderContent();
}
