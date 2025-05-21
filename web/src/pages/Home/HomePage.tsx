import SectionThree from "./SectionThree";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";

export default function HomePage() {
  useToast("delete_success");
  useToast("publish_success");
  return (
    <main className="mx-auto w-full max-w-6xl">
      <div className="mt-5 mb-5 text-lg font-semibold md:text-xl lg:mt-25">
        All Blog Posts
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <SectionThree />
      </div>

      {/* View all posts button */}
      <div className="mt-8 text-center">
        <Button variant="outline">View all posts</Button>
      </div>
    </main>
  );
}
