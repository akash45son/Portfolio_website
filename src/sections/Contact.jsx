import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [focusedInput, setFocusedInput] = useState(null);

  const inputStyles = "w-full bg-transparent border-b-2 border-white/10 px-0 py-4 text-white placeholder-transparent focus:outline-none focus:border-neon-cyan transition-colors peer";
  const labelStyles = "absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-neon-cyan peer-focus:text-sm";

  return (
    <section id="contact" className="py-32 px-6 md:px-12 relative min-h-screen flex items-center bg-dark-bg" ref={containerRef}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-neon-cyan tracking-widest uppercase text-sm mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-neon-cyan"></span>
              Contact Me
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-font leading-tight mb-8">
              Let's build something <span className="text-gradient">great</span> together.
            </h3>
            <p className="text-gray-400 text-lg max-w-md mb-12">
              Have a project in mind, or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
            </p>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:2004sonawaneakash@gmail.com" className="text-2xl font-medium hover:text-neon-cyan transition-colors w-max">
                2004sonawaneakash@gmail.com
              </a>
              <div className="flex flex-wrap gap-6 mt-4">
                {[
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/akash-sonawane-8b4381223/' },
                  { name: 'GitHub', url: 'https://github.com/akash45son' }
                ].map((social) => (
                  <a key={social.name} href={social.url} target={social.url !== '#' ? "_blank" : "_self"} rel="noreferrer" className="text-gray-500 hover:text-white transition-colors uppercase text-xs tracking-widest cursor-pointer">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2 glass-card p-8 md:p-14"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  className={inputStyles} 
                  placeholder="name"
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                />
                <label htmlFor="name" className={labelStyles}>Your Name</label>
                <div 
                  className={`absolute bottom-0 left-0 h-[2px] bg-neon-cyan origin-left transition-all duration-300 w-full ${focusedInput === 'name' ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </div>

              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  className={inputStyles} 
                  placeholder="email"
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
                <label htmlFor="email" className={labelStyles}>Email Address</label>
                <div 
                  className={`absolute bottom-0 left-0 h-[2px] bg-neon-cyan origin-left transition-all duration-300 w-full ${focusedInput === 'email' ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </div>

              <div className="relative">
                <textarea 
                  id="message" 
                  rows="4" 
                  className={inputStyles + " resize-none"} 
                  placeholder="message"
                  onFocus={() => setFocusedInput('message')}
                  onBlur={() => setFocusedInput(null)}
                />
                <label htmlFor="message" className={labelStyles}>Your Message</label>
                <div 
                  className={`absolute bottom-0 left-0 h-[2px] bg-neon-cyan origin-left transition-all duration-300 w-full ${focusedInput === 'message' ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </div>

              <MagneticButton className="mt-4 bg-white text-dark-bg font-bold py-5 hover:bg-neon-cyan hover:text-dark-bg border-none">
                Send Message
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
