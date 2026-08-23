import { SceneProvider } from "./scene/Provider";
import { useScene } from "./scene/store";
import Paper from "./scene/Paper";
import FluidCursor from "./scene/FluidCursor";
import BlobCursor from "./scene/BlobCursor";
import Toasts from "./scene/Toasts";
import Confetti from "./scene/Confetti";
import Boundary from "./ui/Boundary";
import Marquee from "./ui/Marquee";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Mindset from "./sections/Mindset";
import Skills from "./sections/Skills";
import Playground from "./sections/Playground";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function Site() {
  const { effects, coarse } = useScene();
  const playful = effects && !coarse;

  return (
    <>
      <Paper />
      {playful && (
        <Boundary>
          <FluidCursor />
        </Boundary>
      )}
      {playful && <BlobCursor />}

      <Navbar />

      <main className="relative z-[1]">
        <Hero />
        <Marquee
          items={["frontend", "backend", "playwright", "react", "python", "curiosity"]}
          color="var(--ink)"
          ink="var(--paper)"
          tilt={-1.6}
        />
        <Work />
        <Experience />
        <Mindset />
        <Marquee
          items={["build", "break", "debug", "learn", "repeat"]}
          color="var(--lime)"
          ink="var(--ink)"
          tilt={1.4}
        />
        <Skills />
        <Playground />
        <About />
        <Contact />
        <Footer />
      </main>

      <Toasts />
      <Confetti />
    </>
  );
}

export default function App() {
  return (
    <SceneProvider>
      <Site />
    </SceneProvider>
  );
}
