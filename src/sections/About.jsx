import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef(null);
  
  // Parallax offsets for the floating cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 relative min-h-screen flex items-center bg-dark-bg">
      <div className="container mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Column: Typography & Story */}
          <div className="w-full lg:w-1/2 z-10">
            <h2 className="text-neon-blue tracking-widest uppercase text-sm mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-neon-blue"></span>
              About Me
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-font leading-[1.15] mb-10 text-white">
              Driven by solving complex problems with <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple font-style-italic">elegant code</span>.
            </h3>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-xl">
              <p>
                I am a passionate software engineer focused on crafting clean, high-performance, and deeply scalable systems. I believe the best applications combine robust logic with intuitive user experiences.
              </p>
              <p>
                With a strong foundational understanding of software architectures, data structures, and modern full-stack development, I tackle complex technical challenges to deliver impactful applications.
              </p>
            </div>
            

          </div>

          {/* Right Column: Visual Bento Box / Glass Cards */}
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center mt-10 lg:mt-0">
            
            {/* Ambient Background Globs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ff4d2d]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-orange-400/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
            
          </div>

        </div>
      </div>
    </section>
  );
}
