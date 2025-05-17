import { useEffect } from "react";
import SectionTitle from "@/components/pages/home/SectionTitle";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import CardOneSkeleton from "@/components/skeletons/CardOneSkeleton";
import CardOne from "@/components/pages/home/CardOne";
import { useQuery } from "@tanstack/react-query";

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

export default function Home() {
  const location = useLocation();

  // display sonner success message blog is posted
  useEffect(() => {
    if (location.state && "publish_success" in location.state) {
      toast.success(location.state.publish_success, {
        position: "bottom-right",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
