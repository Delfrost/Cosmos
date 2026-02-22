import Hero from "@/components/layout/Hero";
import Services from "@/components/layout/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Hero />
      <Services />
    </main>
  );
}