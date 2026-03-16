import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { useMagneticCursor } from './hooks/useMagneticCursor';

function AppContent() {
  useMagneticCursor();
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <AnimatePresence>
      <AppContent />
    </AnimatePresence>
  );
}
