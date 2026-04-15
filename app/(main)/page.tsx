import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Education from "../components/sections/Education";
import Legal from "../components/sections/Legal";
import Sports from "../components/sections/Sports";
import Initiatives from "../components/sections/Initiatives";
import Contact from "../components/sections/Contact";
import Media from "../components/sections/Media";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <About />
      <Education/>
      <Legal/>
      <Sports/>
      <Initiatives/>
      <Media/>
    <Contact/>
    </main>
  );
}