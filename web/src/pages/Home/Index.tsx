import useToast from "@/hooks/useToast";
import CardOne from "@/pages/Home/CardOne";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "@/pages/Home/SectionTitle";
import CardOneSkeleton from "@/components/skeletons/CardOneSkeleton";
import CustomToast from "@/components/shared/CustomToast";

export type Post = {
  id: number;
  user_id: number;
  category: string;
  title: string;
  body: string;
  image: string;
  created_at: string;
  user: {
    name: string;
    profile_picture: string;
  };
};

export default function Index() {
  useToast("publish_success");

  // fetch all posts
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Error fetching the data");
      return response.json();
    },
    staleTime: 30000,
  });

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
        .map((post: Post) => <CardOne key={post.id} {...post} />);
    }
  };

  return (
    <>
      <main className="mx-auto w-full max-w-6xl">
        <SectionTitle title="All blog posts" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {renderContent()}
        </div>

        {/* View all posts button */}
        <div className="mt-8 text-center">
          <Button variant="outline">View all posts</Button>
        </div>
      </main>
    </>
  );
}
