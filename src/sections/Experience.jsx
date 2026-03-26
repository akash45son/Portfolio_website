import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    role: '3rd Year Computer Engineering Student',
    company: 'AISSMS IOIT College, Pune',
    period: 'Currently Pursuing',
    description: 'Focusing on core computer science subjects, software development, data structures, and algorithmic problem solving to build a strong engineering foundation.'
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <section id="education" className="py-32 px-6 md:px-12 relative min-h-[70vh]">
      <div className="container mx-auto" ref={containerRef}>
        <h2 className="text-neon-pink tracking-widest uppercase text-sm mb-20 flex items-center gap-4">
          <span className="w-12 h-px bg-neon-pink"></span>
          Education
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-purple via-neon-cyan to-neon-pink origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-32 relative z-10">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 w-full ${i % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-4xl font-bold heading-font text-white">{exp.role}</h3>
                  <h4 className="text-neon-cyan text-xl md:text-2xl mt-2 mb-6">{exp.company}</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">{exp.description}</p>
                </div>
                
                <div className="flex items-center justify-start md:justify-center relative w-full md:w-0">
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-dark-bg border-2 border-neon-purple z-20 shadow-[0_0_15px_rgba(192,132,252,0.8)]" />
                  <span className={`ml-8 md:ml-0 md:absolute md:top-1/2 md:-translate-y-1/2 text-gray-500 font-mono tracking-wider w-40 text-lg ${i % 2 === 0 ? 'md:right-8 md:text-left' : 'md:left-8 md:text-right'}`}>
                    {exp.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
