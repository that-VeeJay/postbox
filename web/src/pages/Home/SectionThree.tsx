import { CardThree, useGetPosts } from "@/features/posts";
import CustomToast from "@/components/shared/CustomToast";
import CardOneSkeleton from "@/components/skeletons/CardOneSkeleton";
import type { PostType } from "@/features/posts/types";

export default function SectionThree() {
  const { data, isLoading, error } = useGetPosts();

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <CardOneSkeleton key={index} />
      ));
    }

    if (error) {
      return (
        <div className="col-span-full text-center">
          <CustomToast
            message="Failed to load posts. Please try again later."
            type="error"
          />
        </div>
      );
    }

    if (Array.isArray(data) && data.length > 0) {
      return data
        .slice(0, 9)
        .map((post: PostType) => <CardThree key={post.id} {...post} />);
    }
  };
  return renderContent();
}
