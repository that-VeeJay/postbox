import { ScrollArea } from "@/components/ui/scroll-area";
import UploadsCard from "./UploadsCard";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useQuery } from "@tanstack/react-query";

type PostType = {
  id: number;
  title: string;
  image: string;
};

export default function UploadsTab() {
  const { user, token } = useContext(UserContext);

  const { data, isLoading } = useQuery({
    queryKey: ["user_posts", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${user.id}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    },
    staleTime: 30000,
    enabled: !!user && !!token,
  });

  if (isLoading) {
    return <p>Fetching posts...</p>;
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[525px] rounded-md border p-4">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data &&
            data.map((post: PostType) => (
              <UploadsCard
                key={post.id}
                title={post.title}
                image={post.image}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
