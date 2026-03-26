import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[5000] flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="text-2xl font-bold heading-font cursor-pointer">
        Dev<span className="text-neon-cyan">.</span>
      </div>
      <nav className="hidden md:flex gap-8 items-center cursor-none">
        {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-gray-300 hover:text-white transition-colors relative group font-medium"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon-cyan transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      {/* Mobile Menu Icon */}
      <div className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50">
        <div className="w-8 h-[2px] bg-white transition-all"></div>
        <div className="w-8 h-[2px] bg-white transition-all"></div>
      </div>
    </motion.header>
  );
}
