import React from 'react';
import {Globe} from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";

const About = () => {
  return (<section id="about" className ="c-space section spacing">
    <h2 className="text-heading">About Me</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
            <img 
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
            />
            <div className="z-10">
                <p className="headtext">Hi, I'm Ayesha Mahjabin Nishat</p>
                <p className="text-subheading">
                    A third year computer science student with a strong interest in software development, 
                    frontend UI/UX design, and AI-driven technologies.
                    I'm currently exploring advanced React patterns, models like OpenAI APIs, and ML-powered features.
                    I aim to intern at a tech-forward company where I can grow as a developer,
                    learn from experienced teams, and contribute to innovative projects.
                </p>
            </div>
            <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
            </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
            <p>Technical skills- Python, Java, C, HTML, JavaScript, SQL, React, TailwindCSS, UI/UX.</p>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I'm based in St. John's, NL, Canada. <br/> [open to remote work opportunities.]
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe/>
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5"></div>
        </div>
  </section>
    
  );
}

export default About;
