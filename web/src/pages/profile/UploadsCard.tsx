import sampleImage from "../../assets/posts/nature.jpg";

export default function UploadsCard() {
  return (
    <div className="group relative aspect-square w-full overflow-hidden">
      <div className="absolute bottom-0 z-20 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="line-clamp-3 p-1 text-sm text-white">
          Lorema ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sapiente, deleniti.
        </span>
      </div>

      <img
        src={sampleImage}
        alt=""
        className="z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}
