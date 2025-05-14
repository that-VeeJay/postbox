import { Badge } from "@/components/ui/badge";
import { UpperRightArrow } from "@/components/icons/UpperRightArrow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import image1 from "../../../assets/posts/nature.jpg";
import profile1 from "../../../assets/posts/profile1.jpg";

export default function CardOne() {
  return (
    <div className="space-y-3">
      <img src={image1} alt="" className="aspect-[16/7] object-cover" />
      <div className="space-y-3 p-3">
        <Badge>Nature</Badge>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">UX Review Presentation</h2>
          <UpperRightArrow size={20} />
        </div>
        <p className="line-clamp-2 text-sm">
          How do you create compelling presentations to wow your colleagues and
          impress your managers?
        </p>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profile1} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>John Smith</span>
          </div>
          <span>September 10, 2025</span>
        </div>
      </div>
    </div>
  );
}
