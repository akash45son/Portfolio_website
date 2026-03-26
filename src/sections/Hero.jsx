import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import MagneticButton from '../components/ui/MagneticButton';
import HeroVisual from '../components/HeroVisual';
import { LeftHero3D } from '../components/LeftHero3D';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      
      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center relative z-10 gap-10">
        
        {/* LEFT: Text Content with 3D Glass Object behind it */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20 relative min-h-[50vh] justify-center">
          
          {/* Left Side 3D Minimal Tech Node */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none transform md:-translate-x-20">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <LeftHero3D />
            </Canvas>
          </div>

          <div className="relative z-10 w-full flex flex-col items-center md:items-start pt-10">
            <motion.p
              className="text-neon-cyan font-semibold mb-4 tracking-widest uppercase text-sm md:text-base drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm AKASH SONAWANE
            </motion.p>
            
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold heading-font leading-[1.2] mb-6 max-w-2xl drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Architecting <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">scalable</span> software and robust systems.
            </motion.h1>

            <motion.p
              className="text-white/80 text-lg md:text-xl mb-10 max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Software Engineering student focused on building clean, efficient, and scalable applications with modern web technologies.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <MagneticButton className="bg-white text-dark-bg hover:bg-gray-200 hover:text-dark-bg border-none px-8 py-4 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <a href="#projects" className="pointer-events-none">View Projects</a>
              </MagneticButton>
              <MagneticButton className="px-8 py-4 border-white/20 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-colors backdrop-blur-md bg-dark-bg/30">
                <a href="#contact" className="pointer-events-none">Contact Me</a>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* RIGHT: Visual Element (User Portrait) */}
        <div className="w-full md:w-1/2 h-[45vh] md:h-[80vh] relative z-20 flex items-center justify-center mt-4 md:mt-0">
          <HeroVisual imageSrc="/me.jpg" />
        </div>

      </div>
    </section>
  );
}
