import { CardTwo } from '@/features/posts';
import { useGetRecentPosts } from '@/features/posts/hooks/useGetRecentPosts';
import type { PostType } from '@/features/posts/types';

export default function SectionTwo() {
   const { data } = useGetRecentPosts();

   const renderContent = () => {
      if (Array.isArray(data) && data.length > 0) {
         return data.map((post: PostType) => <CardTwo key={post.id} {...post} />);
      }
   };

   return renderContent();
}
