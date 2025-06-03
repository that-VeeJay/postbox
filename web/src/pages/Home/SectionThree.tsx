import { CardThree } from '@/features/posts';
import CardOneSkeleton from '@/components/skeletons/CardOneSkeleton';
import type { PostType } from '@/features/posts/types';
import { useGetLatestPosts } from '@/features/posts/hooks/useGetLatestPosts';

export default function SectionThree() {
   const { data, isLoading } = useGetLatestPosts();

   const renderContent = () => {
      if (isLoading) {
         return Array.from({ length: 3 }).map((_, index) => <CardOneSkeleton key={index} />);
      }

      if (Array.isArray(data) && data.length > 0) {
         return data.slice(0, 9).map((post: PostType) => <CardThree key={post.id} {...post} />);
      }
   };
   return renderContent();
}
