import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import image1 from "../../../assets/posts/nature.jpg";
import profile1 from "../../../assets/posts/profile1.jpg";

export default function Hero() {
  return (
    <>
      <div className="relative mx-auto w-full max-w-6xl">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image1}
            alt="Hero section image"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Content */}
        <div className="space-y-5 rounded-md bg-white p-6 lg:absolute lg:bottom-0 lg:left-0 lg:w-1/2 lg:translate-x-15 lg:translate-y-15 lg:p-10 lg:shadow-md dark:bg-neutral-950 dark:shadow-none lg:dark:bg-neutral-900">
          <Badge>Technology</Badge>
          <h1 className="line-clamp-3 text-xl font-semibold lg:text-2xl">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
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
