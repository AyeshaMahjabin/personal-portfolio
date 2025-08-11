import React, { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { HiDocument } from 'react-icons/hi';
import Dock from '../components/Dock';

const resumeUrl = "/assets/resume.pdf"; // Place your PDF in public/assets

const items = [
  {
    icon: <FaLinkedin size={18} />,
    label: 'LinkedIn',
    onClick: () => window.open('https://www.linkedin.com/in/ayesha-m-n', '_blank'),
  },
  {
    icon: <FaGithub size={18} />,
    label: 'GitHub',
    onClick: () => window.open('http://github.com/AyeshaMahjabin ', '_blank'),
  },
  {
    icon: <HiDocument size={18} />,
    label: 'Resume',
    onClick: () => window.open(resumeUrl, '_blank'),
  },
  {
    icon: <IoMdMail size={18} />,
    label: 'Email',
    onClick: () => window.location.href= 'mailto:amnishat@mun.ca',
  },
];

const Contact = () => {
  const [message, setMessage] = useState('');
  return (
    <section id="contact" className="c-space section spacing flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-heading mb-8">Contact</h2>
      <Dock
        items={items}
        panelHeight={80}
        baseItemSize={50}
        magnification={70}
        distance={80}
        spring={{
          mass: 1,
          stiffness: 300,
          damping: 40,
        }}
      />
      
    </section>
  );
};

export default Contact;
