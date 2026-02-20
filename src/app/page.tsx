import Hero from "@/components/layout/Hero";
import Services from "@/components/layout/Services"; // Import the new component

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Services /> {/* Add it here */}
    </main>
  );
}