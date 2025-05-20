type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="mt-5 mb-5 text-lg font-semibold md:text-xl lg:mt-25">
      {title}
    </div>
  );
}
