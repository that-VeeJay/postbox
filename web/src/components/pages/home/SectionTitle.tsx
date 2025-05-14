type SectionTitleTypes = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleTypes) {
  return (
    <div className="text-lg md:text-xl font-semibold mt-5 mb-5 lg:mt-25">
      {title}
    </div>
  );
}
