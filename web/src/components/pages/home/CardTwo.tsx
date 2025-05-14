import { Badge } from "@/components/ui/badge";
import image1 from "../../../assets/posts/nature.jpg";

export default function CardTwo() {
  return (
    <div className="grid space-y-3 md:grid-cols-2">
      <img
        src={image1}
        alt=""
        className="aspect-[16/7] object-cover md:h-[210px] md:w-full"
      />
      <div className="flex flex-col justify-evenly px-5">
        <div className="space-y-3">
          <Badge>Nature</Badge>
          <h2 className="text-lg font-semibold">Migrating to Linear 101</h2>
          <p className="line-clamp-3 text-sm">
            Linear helps streamline software projects,sprints, tasks, and bug
            tracking.
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="text-sm">Anne Curtis</span>
          <span>•</span>
          <span className="text-sm">November 10, 2001</span>
        </div>
      </div>
    </div>
  );
}
