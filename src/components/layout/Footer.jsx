export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-dark-bg relative z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold heading-font">
          Dev<span className="text-neon-cyan">.</span>
        </div>
        
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AKASH SONAWANE. All rights reserved.
        </p>
        
        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
