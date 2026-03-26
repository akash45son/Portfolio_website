import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroVisual({ imageSrc }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let particles = [];
    
    // ======== DOT MATRIX CONFIGURATION ========
    // Ultra-high resolution particle grid for a premium, classy portrait
    const spacing = 3; // Very dense for high-definition, sharp photographic quality
    const color = '#ff4d2d'; // Neon orange/red tone
    const dispersionRadius = 150; // Vastly increased interaction radius for prominent deformation
    // ==========================================

    const image = new Image();
    image.crossOrigin = "Anonymous";
    // Force bypass browser cache so you see the newest image instantly
    image.src = `${imageSrc}?t=${new Date().getTime()}`;

    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const init = () => {
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const imgAspect = image.width / image.height;
      
      // Use 'contain' logic with minimal padding (5%) so the image is larger but still uncropped
      const padding = Math.min(canvas.width, canvas.height) * 0.05;
      const targetWidth = canvas.width - padding * 2;
      const targetHeight = canvas.height - padding * 2;
      const canvasAspect = targetWidth / targetHeight;
      
      let imgWidth, imgHeight;
      if (imgAspect > canvasAspect) {
        imgWidth = targetWidth;
        imgHeight = imgWidth / imgAspect;
      } else {
        imgHeight = targetHeight;
        imgWidth = imgHeight * imgAspect;
      }
      
      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext('2d');
      
      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;
      offCtx.drawImage(image, x, y, imgWidth, imgHeight);
      
      const pixels = offCtx.getImageData(0, 0, canvas.width, canvas.height);
      const data = pixels.data;
      
      particles = [];
      for (let py = 0; py < canvas.height; py += spacing) {
        for (let px = 0; px < canvas.width; px += spacing) {
          const index = (py * canvas.width + px) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];
          
          if (a > 32) { // Very low alpha threshold to capture all edges
            // Calculate true visual brightness
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Generate dots even for darker areas to maintain the silhouette shape
            if (brightness > 0.02) {
              particles.push({
                x: px, 
                y: py, 
                baseX: px,
                baseY: py,
                brightness: brightness,
                vx: 0,
                vy: 0
              });
            }
          }
        }
      }
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.65; // Balanced transparency for a crisp, classy glow
      
      time += 0.05; // Gentle breathing time

      ctx.beginPath();
      particles.forEach((p) => {
        // Very subtle floating movement so the face doesn't distort
        const waveX = Math.sin(time + p.baseY * 0.02) * 0.5;
        const waveY = Math.cos(time + p.baseX * 0.02) * 0.5;
        
        // Mouse interaction physics
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < dispersionRadius) {
          // Stronger force for an explosive, highly prominent deformation
          const force = (dispersionRadius - dist) / dispersionRadius;
          const pushX = (dx / dist) * force * -15;
          const pushY = (dy / dist) * force * -15;
          p.vx += pushX;
          p.vy += pushY;
        }

        // Smoother, floaty friction so the deformation lingers longer
        p.vx *= 0.85;
        p.vy *= 0.85;
        
        // Slower spring-back so you can see the particles reform elegantly
        p.vx += (p.baseX - p.x) * 0.04;
        p.vy += (p.baseY - p.y) * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // The size of the dot scales exactly with the brightness of the photo pixel
        // Finely tuned for a sharp, premium halftone-print effect
        const radius = Math.max(0.3, (p.brightness * spacing) / 1.6);
        
        ctx.moveTo(p.x + waveX, p.y + waveY);
        ctx.arc(p.x + waveX, p.y + waveY, radius, 0, Math.PI * 2);
      });
      // Single massive fill operation is a massive performance boost!
      ctx.fill();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    image.onload = () => {
      init();
      animate();
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (image.complete) init();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(resizeTimeout);
    };
  }, [imageSrc]);

  return (
    <motion.div 
      ref={containerRef}
      className="w-full h-full relative border border-transparent flex items-center justify-center p-4 transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-dark-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-bg via-dark-bg/50 to-transparent z-10 hidden md:block pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,45,0.1),transparent_60%)] z-0 mix-blend-screen pointer-events-none" />
      
      <canvas 
        ref={canvasRef} 
        className="relative z-0 w-full h-full object-contain cursor-crosshair drop-shadow-[0_0_20px_rgba(255,77,45,0.6)]" 
      />
    </motion.div>
  );
}
