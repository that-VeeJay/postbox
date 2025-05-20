import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
  title: string;
  image: string;
};

export default function UploadsCard({ title, image }: Props) {
  return (
    <div className="group relative aspect-square w-full overflow-hidden">
      <div className="absolute bottom-0 z-20 w-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="line-clamp-3 p-1 text-sm text-white">{title}</span>
      </div>

      <img
        src={getImageUrl(image)}
        alt=""
        className="z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}
