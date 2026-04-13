import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <About />
    </main>
  );
}