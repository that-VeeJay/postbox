import Hero from "@/components/pages/home/Hero";
import CardOne from "@/components/pages/home/CardOne";
import CardTwo from "@/components/pages/home/CardTwo";
import SectionTitle from "@/components/pages/home/SectionTitle";

export default function Home() {
  return (
    <>
      <main className="mt-20 md:mt-30 w-full max-w-6xl mx-auto">
        <Hero />

        <SectionTitle title="Recent blog posts" />

        <div className="grid md:grid-cols-2 gap-5">
          <CardOne />
          <div className="flex flex-col gap-3">
            <CardTwo />
            <CardTwo />
          </div>
        </div>

        <SectionTitle title="All blog posts" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CardOne />
          <CardOne />
          <CardOne />
          <CardOne />
          <CardOne />
          <CardOne />
          <CardOne />
          <CardOne />
          <CardOne />
        </div>
      </main>
    </>
  );
}
