import { SceneProvider } from "./scene/Provider";
import { useScene } from "./scene/store";
import Ground from "./scene/Ground";
import Flora from "./scene/Flora";
import FluidCursor from "./scene/FluidCursor";
import Reticle from "./scene/Reticle";
import Toasts from "./scene/Toasts";
import Confetti from "./scene/Confetti";
import Boundary from "./ui/Boundary";
import Ticker from "./ui/Ticker";
import CommandPalette from "./ui/CommandPalette";
import ScrollRail from "./ui/ScrollRail";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Playground from "./sections/Playground";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const STATUS = [
  "st. john's · nl",
  "utc−03:30",
  "react · three.js · playwright",
  "open to 2026 roles",
  "built in the open",
];

function Site() {
  /* Touch devices get neither — there is no cursor to trail. Everything else
     gets both, always. */
  const { coarse } = useScene();

  return (
    <>
      <Ground />
      <Flora />

      {!coarse && (
        <Boundary>
          <FluidCursor />
        </Boundary>
      )}
      {!coarse && <Reticle />}

      <Navbar />
      <ScrollRail />

      <main className="relative z-[1]">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Playground />
        <About />
        <Contact />
        <Footer />
      </main>

      <CommandPalette />
      <Ticker items={STATUS} />
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
