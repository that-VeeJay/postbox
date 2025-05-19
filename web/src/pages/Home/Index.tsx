import SectionTitle from "@/pages/Home/SectionTitle";
import { Button } from "@/components/ui/button";
import CardOneSkeleton from "@/components/skeletons/CardOneSkeleton";
import CardOne from "@/pages/Home/CardOne";
import { useQuery } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";

export type PostsType = {
  id: number;
  user_id: number;
  category: string;
  title: string;
  body: string;
  image: string;
  created_at: string;
  user: {
    name: string;
  };
};

export default function Index() {
  useToast("publish_success");

  // fetch all posts
  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    if (!response.ok) throw new Error("Error fetching the data");
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10000,
  });

  // all blog post
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => (
        <CardOneSkeleton key={index} />
      ));
    }

    if (error) {
      return (
        <div className="col-span-full text-center text-red-500">
          Failed to load posts. Please try again later.
        </div>
      );
    }

    if (Array.isArray(data) && data.length > 0) {
      return data
        .slice(0, 9)
        .map((post: PostsType) => <CardOne key={post.id} post={post} />);
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
