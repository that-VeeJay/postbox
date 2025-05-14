import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import image1 from "../../../assets/posts/nature.jpg";
import profile1 from "../../../assets/posts/profile1.jpg";

export default function Hero() {
  return (
    <>
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image1}
            alt="Hero section image"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Content */}
        <div className="p-6 lg:p-10 space-y-5 bg-white dark:bg-neutral-950 lg:shadow-md dark:shadow-none rounded-md lg:absolute lg:bottom-0 lg:left-0 lg:translate-x-15 lg:translate-y-15 lg:w-1/2">
          <Badge>Technology</Badge>
          <h1 className="text-xl lg:text-2xl font-semibold line-clamp-3">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>
          <div className="flex items-center gap-5">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={profile1} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>Jason Francisco</span>
            </div>
            <span>August 23, 2022</span>
          </div>
        </div>
      </div>
    </>
  );
}
