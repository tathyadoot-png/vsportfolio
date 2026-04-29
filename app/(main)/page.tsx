import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Education from "../components/sections/Education";
import Legal from "../components/sections/Legal";
import Sports from "../components/sections/Sports";
import Initiatives from "../components/sections/Initiatives";
import Contact from "../components/sections/Contact";
import Media from "../components/sections/Media";
import CredibilityStrip from "../components/sections/credibility";
import PillarsPage from "../(pages)/pillars/page";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <CredibilityStrip/>
      <About />
      <PillarsPage/>
      <Education/>
      <Sports/>
      <Legal/>
      <Initiatives/>
      <Media/>
    <Contact/>
    </main>
  );
}