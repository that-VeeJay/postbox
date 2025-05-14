import Hero from "@/components/pages/home/Hero";
import CardOne from "@/components/pages/home/CardOne";
import CardTwo from "@/components/pages/home/CardTwo";
import SectionTitle from "@/components/pages/home/SectionTitle";

export default function Home() {
  return (
    <>
      <main className="mx-auto mt-20 w-full max-w-6xl md:mt-30">
        <Hero />

        <SectionTitle title="Recent blog posts" />

        <div className="grid gap-5 md:grid-cols-2">
          <CardOne />
          <div className="flex flex-col gap-3">
            <CardTwo />
            <CardTwo />
          </div>
        </div>

        <SectionTitle title="All blog posts" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
