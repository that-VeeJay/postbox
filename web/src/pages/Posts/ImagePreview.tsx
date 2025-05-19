type Props = {
  image: string | null;
};

export default function ImagePreview({ image }: Props) {
  return (
    <div className="dark:border-gray block h-60 rounded-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="relative flex h-full items-center justify-center rounded-lg">
        {image && (
          <div className="absolute bottom-0 left-0 z-20 block w-full bg-black/50 px-2 py-1 text-xs text-white">
            Note: Preview only — final ratio may vary.
          </div>
        )}
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="z-10 h-full w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-center">
            <p className="text-xs">Image preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
