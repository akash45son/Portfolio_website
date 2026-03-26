import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'C++', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'JavaScript', level: 90 },
  { name: 'DSA', level: 75 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'MERN Stack', level: 90 },
  { name: 'Git & GitHub', level: 85 },
  { name: 'Django', level: 80 },
];

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-6 md:px-12 relative flex items-center bg-dark-bg/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-neon-cyan tracking-widest uppercase text-sm mb-10 flex items-center gap-4">
          <span className="w-12 h-px bg-neon-cyan"></span>
          Technical Expertise
        </h2>

        <div 
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="glass-card p-5 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
              <h3 className="text-base md:text-lg font-bold mb-3 relative z-10">{skill.name}</h3>
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative z-10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
