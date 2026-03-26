import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device is touch, as we don't want custom cursor on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hydration check
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-neon-cyan rounded-full pointer-events-none z-[9998] mix-blend-screen"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}
