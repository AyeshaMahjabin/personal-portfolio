import HeroText from "../components/HeroText";
import PlanetModel from "../components/Model";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen overflow-hidden c-space"
    >
      {/* Left side - text */}
      <div className="md:w-1/2">
        <HeroText />
      </div>

      {/* Right side - 3D Planet */}
      <div className="md:w-1/2 flex justify-center items-center p-4">
        <PlanetModel />
      </div>
    </section>
  );
};

export default Hero;
