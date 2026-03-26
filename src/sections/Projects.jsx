import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';

const projects = [
  {
    title: 'InterviewGinie – AI-Powered Interview Prep',
    description: 'An AI-driven platform that analyzes resumes, self-descriptions, and job descriptions to provide actionable insights. Generates personal prep roadmaps, resume evaluations, and targeted technical/behavioral questions using Gemini AI.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Gemini AI'],
    image: '/interview-ginie.png',
    color: 'from-purple-500/20 to-blue-500/20',
    live: 'https://interview-yt.vercel.app/',
    github: 'https://github.com/akash45son/InterviewYT'
  },
  {
    title: 'KisanSahayak – AI-Powered Farmer Assistance',
    description: 'A farmer-centric web platform designed to make government schemes easily accessible based on eligibility. Features an integrated AI chatbot for real-time guidance on applications and schemes.',
    tech: ['HTML', 'Tailwind CSS', 'MongoDB', 'AI Chatbot'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2670&auto=format&fit=crop',
    color: 'from-green-500/20 to-emerald-500/20',
    live: '#',
    github: '#'
  },
  {
    title: 'E-Waste Marketplace',
    description: 'A sustainable e-commerce platform dedicated to buying and selling second-hand electronics. Features an integrated calculator that tracks the carbon footprint saved by choosing reused products.',
    tech: ['Django', 'Python', 'HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2670&auto=format&fit=crop',
    color: 'from-blue-500/20 to-indigo-500/20',
    live: '#',
    github: '#'
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <section id="projects" ref={containerRef} className="py-20 px-6 md:px-12 relative">
      <div className="container mx-auto">
        <h2 className="text-neon-blue tracking-widest uppercase text-sm mb-16 flex items-center gap-4">
          <span className="w-12 h-px bg-neon-blue"></span>
          Projects
        </h2>

        <div className="flex flex-col gap-20 max-w-6xl mx-auto">
          {projects.map((project, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
            const yReverse = useTransform(scrollYProgress, [0, 1], [-150, 150]);
            
            return (
              <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
                <motion.div 
                  className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden relative group shadow-2xl cursor-pointer"
                  style={{ y: i % 2 !== 0 ? yReverse : y }}
                  onClick={() => project.live && project.live !== '#' && window.open(project.live, '_blank')}
                >
                  <div className="absolute inset-0 bg-dark-bg/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover origin-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay z-20 pointer-events-none`} />
                </motion.div>

                <div className="w-full md:w-1/2 flex flex-col justify-center relative z-20 px-4 md:px-8">
                  <h3 className="text-2xl md:text-4xl font-bold heading-font mb-4">{project.title}</h3>
                  <p className="text-gray-400 text-base md:text-lg mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <MagneticButton 
                      className="px-5 py-2.5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-sm"
                      onClick={() => project.live && project.live !== '#' && window.open(project.live, '_blank')}
                    >
                      View Live
                    </MagneticButton>
                    <MagneticButton 
                      className="px-5 py-2.5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-sm"
                      onClick={() => project.github && project.github !== '#' && window.open(project.github, '_blank')}
                    >
                      GitHub
                    </MagneticButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
