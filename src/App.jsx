import React from 'react'
import SplashCursor from './components/SplashCursor';
import Navbar from './sections/Navbar';
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
const App = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#3b3349] via-[#0c0824] to-[#520d87]">
      

    <SplashCursor/>
    <Navbar/>
    <Hero/>
    <About/>
    <Projects/>
    <Contact/>
    
    
    
    <footer className="text-center text-gray-400 text-sm p-4">
      © {new Date().getFullYear()} Ayesha Mahjabin Nishat. All rights reserved.
    </footer>
    
    
    </div>
  );
};

export default App;