import { useState, useEffect } from "react";
import Hero from "@/components/pages/home/Hero";
import CardOne from "@/components/pages/home/CardOne";
import CardTwo from "@/components/pages/home/CardTwo";
import SectionTitle from "@/components/pages/home/SectionTitle";

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
  const [posts, setPosts] = useState<PostsType[]>([]);

  const fetchPost = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();

    console.log(data);
    if (response.ok) {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(posts);
  return (
    <>
      <main className="mx-auto mt-20 w-full max-w-6xl md:mt-30">
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
        <div>
          {posts.length === 0 ? (
            <div className="mb-10 w-full text-center">No posts available</div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <CardOne key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
