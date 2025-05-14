import { Badge } from "@/components/ui/badge";
import image1 from "../../../assets/posts/nature.jpg";

export default function CardTwo() {
  return (
    <div className="grid md:grid-cols-2 space-y-3">
      <img
        src={image1}
        alt=""
        className="object-cover aspect-[16/7] md:w-full md:h-[210px]"
      />
      <div className="px-5 flex flex-col justify-evenly">
        <div className="space-y-3">
          <Badge>Nature</Badge>
          <h2 className="text-lg font-semibold">Migrating to Linear 101</h2>
          <p className="line-clamp-3 text-sm">
            Linear helps streamline software projects,sprints, tasks, and bug
            tracking.
          </p>
        </div>
        <div className="flex gap-2 mt-3 ">
          <span className="text-sm">Anne Curtis</span>
          <span>•</span>
          <span className="text-sm">November 10, 2001</span>
        </div>
      </div>
    </div>
  );
}
