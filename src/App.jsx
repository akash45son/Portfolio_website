import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import Hero from './sections/Hero';
import About from './sections/About';
import Footer from './components/layout/Footer';

const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Experience = lazy(() => import('./sections/Experience'));
const Contact = lazy(() => import('./sections/Contact'));

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neon-cyan">Loading sections...</div>}>
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </Suspense>
      <Footer />
    </Layout>
  );
}

export default App;
