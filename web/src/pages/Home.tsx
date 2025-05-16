import { useState, useEffect } from "react";
import Hero from "@/components/pages/home/Hero";
import CardOne from "@/components/pages/home/CardOne";
import CardTwo from "@/components/pages/home/CardTwo";
import SectionTitle from "@/components/pages/home/SectionTitle";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import CardOneSkeleton from "@/components/skeletons/CardOneSkeleton";

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
  const [posts, setPosts] = useState<PostsType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // display sonner success message blog is posted
  useEffect(() => {
    if (location.state && "publish_success" in location.state) {
      toast.success(location.state.publish_success, {
        position: "bottom-right",
      });
    }
  }, [location.state]);

  // fetch all posts
  const fetchPost = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();

    if (response.ok) {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <main className="mx-auto w-full max-w-6xl">
        {/* <Hero /> */}

        {/* <SectionTitle title="Recent blog posts" /> */}

        {/* <div className="grid gap-5 md:grid-cols-2">
          <CardOne />
          <div className="flex flex-col gap-3">
            <CardTwo />
            <CardTwo />
          </div>
        </div> */}

        <SectionTitle title="All blog posts" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <>
              <CardOneSkeleton />
              <CardOneSkeleton />
              <CardOneSkeleton />
            </>
          ) : (
            posts
              .slice(0, 9)
              .map((post) => <CardOne key={post.id} post={post} />)
          )}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">View all posts</Button>
        </div>
      </main>
    </>
  );
}
